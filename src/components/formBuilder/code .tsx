"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/code-block";
import { FormField } from "@/type/form";

type CodeViewProps = {
  fields: FormField[];
};

const generateFieldCodes = (item: FormField) => {
  const renderInputField = () => {
    switch (item.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "date":
        return `<Input type="${item.type}" placeholder="${
          item.placeholder || ""
        }" {...field} />`;
      case "textarea":
        return `<Textarea placeholder="${
          item.placeholder || ""
        }" {...field} />`;
      case "select":
        return `
            <Select {...field}>
              ${
                item.options
                  ?.map(
                    (option) => `<option value="${option}">${option}</option>`
                  )
                  .join("\n") || ""
              }
            </Select>`;
      case "checkbox":
        return `<Checkbox {...field} />`;
      case "radio":
        return item.options
          ?.map(
            (option) => `<Radio value="${option}" {...field}>${option}</Radio>`
          )
          .join("\n");
      case "switch":
        return `<Switch {...field} />`;
      default:
        return `<Input {...field} />`;
    }
  };

  return `
    <FormField
      key="${item.id}"
      name="${item.name}"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>${item.label}</FormLabel>
          <FormControl>
            ${renderInputField()}
          </FormControl>
          ${
            item.description
              ? `<FormDescription>${item.description}</FormDescription>`
              : ""
          }
          <FormMessage />
        </FormItem>
      )}
    />`;
};

export function CodeView({ fields }: CodeViewProps) {
  const generateFieldCode = (item: FormField) => {
    return `
  <FormField
    key="${item.id}"
    name="${item.name}"
    control={form.control}
    render={({ field }) => (
      <FormItem>
        <FormLabel>${item.label}</FormLabel>
        <FormControl>
          ${generateFieldCodes(item)}
        </FormControl>
        ${
          item.description
            ? `<FormDescription>${item.description}</FormDescription>`
            : ""
        }
        <FormMessage />
      </FormItem>
    )}
  />`;
  };

  const code = `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  ${fields.map((field) => `${field.name}: z.${field.type}()`).join(",\n  ")}
});

export function FormBuilder() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${fields
        .map(
          (field) =>
            `${field.name}: ${
              field.type === "text"
                ? '""'
                : field.type === "number"
                ? "0"
                : "undefined"
            }`
        )
        .join(",\n      ")}
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        ${fields.map(generateFieldCode).join("\n        ")}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
`;

  return (
    <div className="max-w-3xl mx-auto w-full">
      <CodeBlock language="tsx" filename="FormBuilder.tsx" code={code} />
    </div>
  );
}
