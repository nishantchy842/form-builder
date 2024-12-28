import { z } from "zod";

const baseValidationSchema = z
  .object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
    message: z.string().optional(),
  })
  .optional();

export const formSchema = z.object({
  type: z.enum([
    "text",
    "textarea",
    "number",
    "email",
    "password",
    "select",
    "checkbox",
    "radio",
    "date",
    "switch",
  ] as const),
  label: z.string().min(1, "Label is required"),
  descriptions: z.string().optional(),
  placeholder: z.string().optional(),
  required: z.boolean().default(false),
  options: z.string().optional(),
  validation: baseValidationSchema,
});


export type FormSchema = z.infer<typeof formSchema>;
