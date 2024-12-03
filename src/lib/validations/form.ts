import * as z from "zod";

export const formComponentSchema = z.object({
  id: z.string(),
  type: z.enum(["text", "select", "radio", "checkbox", "textarea"]),
  label: z.string().min(1, "Label is required"),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  value: z.union([
    z.string().min(1, "This field cannot be empty"),
    z.boolean(),
    z.array(z.string())
  ]).optional(),
});

export const formSchema = z.object({
  components: z.array(formComponentSchema),
});

export type FormValidation = z.infer<typeof formSchema>;