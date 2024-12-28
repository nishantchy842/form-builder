export type FormFieldType =
  | "text"
  | "textarea"
  | "number"
  | "email"
  | "password"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "switch";

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
  options?: { label: string; value: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
}
