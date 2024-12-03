import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formComponentSchema } from "@/lib/validations/form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { FormComponent, componentTypes } from "./types";

interface FormComponentPreviewProps {
  component: FormComponent;
  preview?: boolean;
  onSubmit?: (values: any) => void;
}

export const FormComponentPreview: React.FC<FormComponentPreviewProps> = ({ 
  component, 
  preview, 
  onSubmit 
}) => {
  const form = useForm({
    resolver: zodResolver(formComponentSchema),
    defaultValues: {
      ...component,
      value: component.value || "",
    },
  });

  const handleSubmit = (values: any) => {
    console.log("Component submitted:", component.id, values);
    if (onSubmit) {
      const formattedValues = {
        [component.id]: values.value
      };
      onSubmit(formattedValues);
    }
  };

  switch (component.type) {
    case componentTypes.TEXT:
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <Label>{component.label} {component.required && "*"}</Label>
                  <FormControl>
                    <Input 
                      type="text" 
                      placeholder="Enter text..." 
                      {...field} 
                      value={field.value as string || ""}
                      required={component.required}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );

    case componentTypes.SELECT:
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <Label>{component.label} {component.required && "*"}</Label>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value as string || ""}
                    required={component.required}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {component.options?.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );

    case componentTypes.RADIO:
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <Label>{component.label} {component.required && "*"}</Label>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange}
                      value={field.value as string || ""}
                      required={component.required}
                    >
                      {component.options?.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <RadioGroupItem value={option} id={option} />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );

    case componentTypes.CHECKBOX:
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean || false}
                        onCheckedChange={field.onChange}
                        id={component.id}
                        required={component.required}
                      />
                    </FormControl>
                    <Label htmlFor={component.id}>{component.label} {component.required && "*"}</Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );

    case componentTypes.TEXTAREA:
      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <Label>{component.label} {component.required && "*"}</Label>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter text..." 
                      {...field}
                      value={field.value as string || ""}
                      required={component.required}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      );
    default:
      return null;
  }
};