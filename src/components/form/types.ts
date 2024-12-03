export const componentTypes = {
  TEXT: "text",
  SELECT: "select",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  TEXTAREA: "textarea",
} as const;

export type ComponentType = typeof componentTypes[keyof typeof componentTypes];

export interface FormComponent {
  id: string;
  type: ComponentType;
  label: string;
  required?: boolean;
  options?: string[];
  value?: string | boolean | string[];
}