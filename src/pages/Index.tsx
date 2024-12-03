import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  componentTypes,
  DraggableComponent,
  FormComponent,
  FormComponentPreview,
} from "@/components/FormComponents";
import { formSchema } from "@/lib/validations/form";

const Index = () => {
  const [formComponents, setFormComponents] = useState<FormComponent[]>([]);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [editingComponent, setEditingComponent] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("componentType") as FormComponent["type"];
    const label = e.dataTransfer.getData("componentLabel");

    const newComponent: FormComponent = {
      id: `${type}-${Date.now()}`,
      type,
      label,
      options: type === "select" || type === "radio" ? ["Option 1", "Option 2", "Option 3"] : undefined,
    };

    setFormComponents((prev) => [...prev, newComponent]);
    toast.success("Component added to form");
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const validateForm = (values: Record<string, any>) => {
    const errors: Record<string, string> = {};
    let hasErrors = false;

    formComponents.forEach(component => {
      const value = values[component.id];
      console.log(`Validating component ${component.id}:`, { value, required: component.required });

      if (component.required && (!value || value === "")) {
        errors[component.id] = "This field is required";
        hasErrors = true;
      }
    });

    setFormErrors(errors);
    return !hasErrors;
  };

  const handleSubmit = (values: Record<string, any>) => {
    console.log("Form submitted with values:", values);
    
    const isValid = validateForm(values);
    
    if (!isValid) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const validatedForm = formSchema.parse({ components: formComponents });
      console.log("Form validation passed:", validatedForm);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("Form validation error:", error);
      toast.error("Form validation failed");
    }
  };

  const handleLabelEdit = (componentId: string, newLabel: string) => {
    setFormComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? { ...comp, label: newLabel }
          : comp
      )
    );
    setEditingComponent(null);
  };

  const exportSchema = () => {
    const schema = {
      components: formComponents,
      created_at: new Date().toISOString(),
    };
    
    const filePath = 'dummy-form-data.json';
    const blob = new Blob([JSON.stringify(schema, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filePath;
    a.click();
    URL.revokeObjectURL(url);
    
    setExportDialogOpen(false);
    toast.success("Form schema exported successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Form Builder</h1>
          <div className="space-x-4">
            <Button
              variant={isPreviewMode ? "outline" : "default"}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
            <Button onClick={() => setExportDialogOpen(true)}>Export Schema</Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-8">
          {!isPreviewMode && (
            <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Components</h2>
              <div className="space-y-2">
                <DraggableComponent type={componentTypes.TEXT} label="Text Input" />
                <DraggableComponent type={componentTypes.SELECT} label="Select Dropdown" />
                <DraggableComponent type={componentTypes.RADIO} label="Radio Group" />
                <DraggableComponent type={componentTypes.CHECKBOX} label="Checkbox" />
                <DraggableComponent type={componentTypes.TEXTAREA} label="Text Area" />
              </div>
            </div>
          )}

          <div className={`${isPreviewMode ? "col-span-4" : "col-span-3"}`}>
            <div
              className={`bg-white rounded-lg shadow-lg p-6 ${
                !isPreviewMode ? "droppable-area" : "form-preview"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <h2 className="text-xl font-semibold mb-6">
                {isPreviewMode ? "Form Preview" : "Drop Components Here"}
              </h2>
              <div className="space-y-6">
                {formComponents.map((component) => (
                  <div key={component.id} className="relative group">
                    {!isPreviewMode && (
                      <div className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingComponent(component.id)}
                        >
                          Edit Label
                        </Button>
                      </div>
                    )}
                    {editingComponent === component.id ? (
                      <div className="flex items-center gap-2 mb-2">
                        <Input
                          defaultValue={component.label}
                          onBlur={(e) => handleLabelEdit(component.id, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleLabelEdit(component.id, e.currentTarget.value);
                            }
                          }}
                          autoFocus
                        />
                      </div>
                    ) : (
                      <FormComponentPreview
                        key={component.id}
                        component={component}
                        preview={isPreviewMode}
                        onSubmit={handleSubmit}
                      />
                    )}
                  </div>
                ))}
              </div>
              {formComponents.length === 0 && !isPreviewMode && (
                <p className="text-gray-500 text-center py-8">
                  Drag and drop components to build your form
                </p>
              )}
              {formComponents.length > 0 && isPreviewMode && (
                <Button 
                  className="mt-6" 
                  onClick={() => handleSubmit(formComponents)}
                >
                  Submit Form
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Form Schema</DialogTitle>
            <DialogDescription>
              The form schema will be exported to: dummy-form-data.json
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setExportDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={exportSchema}>Export</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
