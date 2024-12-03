import { ComponentType } from "./types";

interface DraggableComponentProps {
  type: ComponentType;
  label: string;
}

export const DraggableComponent: React.FC<DraggableComponentProps> = ({
  type,
  label,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentLabel", label);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="draggable-component p-4 mb-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-move border border-gray-200"
    >
      <p className="font-medium">{label}</p>
    </div>
  );
};