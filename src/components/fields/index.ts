import { FormField } from "@/type/form";

export const Allfields: FormField[] = [
  {
    id: "1",
    type: "text",
    name: `name_${crypto.randomUUID()}`,
    label: "Text Input",
    placeholder: "Enter your text",
    description: "This is a description",
    required: true,
  },
  {
    id: " 2",
    type: "email",
    name: `name_${crypto.randomUUID()}`,
    label: "Email Input",
    placeholder: "Enter your email",
    description: "This is a description",

    required: true,
  },
  {
    id: "3",
    name: `name_${crypto.randomUUID()}`,
    type: "password",
    label: "Password Input",
    placeholder: "Enter your password",
    description: "This is a description",

    required: true,
  },
  {
    id: "4",
    name: `name_${crypto.randomUUID()}`,
    type: "number",
    label: "Number Input",
    placeholder: "Enter your number",
    description: "This is a description",

    required: true,
  },
  {
    id: "5",
    name: `name_${crypto.randomUUID()}`,
    type: "textarea",
    label: "Textarea",
    placeholder: "Enter your text",
    required: true,
    description: "This is a description",
  },
  {
    type: "select",
    label: "Select",
    placeholder: "Select an option",
    description: "This is a description",

    options: [
      {
        label: "Option 1",
        value: "option1",
      },
      {
        label: "Option 2",
        value: "option2",
      },
      {
        label: "Option 3",
        value: "option3",
      },
    ],
    required: true,

    id: "6",
    name: `name_${crypto.randomUUID()}`,
  },
  {
    type: "radio",
    label: "Radio",
    placeholder: "Select an option",
    options: [
      {
        label: "Option 1",
        value: "option1",
      },
    ],
    required: true,
    description: "This is a description",

    id: "7",
    name: `name_${crypto.randomUUID()}`,
  },
  {
    type: "checkbox",
    label: "Checkbox",
    placeholder: "Select an option",
    description: "This is a description",

    options: [
      {
        label: "Option 1",
        value: "option1",
      },
    ],
    required: true,
    id: "8",
    name: `name_${crypto.randomUUID()}`,
  },
  {
    type: "date",
    label: "Date",
    placeholder: "Select a date",
    required: true,
    id: "9",
    name: `name_${crypto.randomUUID()}`,
    description: "This is a description",
  },

  {
    type: "switch",
    label: "Switch",
    placeholder: "Select an option",
    required: true,
    id: "10",
    name: `name_${crypto.randomUUID()}`,
    description: "This is a description",
  },
];
