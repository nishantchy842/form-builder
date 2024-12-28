"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FormField, FormFieldType } from "@/type/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Allfields } from "../fields";
import { FormSchema, formSchema } from "../schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AddFieldDialog } from "./addField";
import { CodeView } from "./code ";
import { FormFieldComponent } from "./formField";
import Preview from "./preview";

export function FormBuilder() {
  const [fields, setFields] = useState<FormField[]>([]);
  const [id, setId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "text",
      label: "",
      placeholder: "",
      required: false,
      options: "",
      validation: {
        min: undefined,
        max: undefined,
        pattern: undefined,
        message: undefined,
      },
    },
  });

  const handleAddField = (field: FormField) => {
    setFields((prev) => [...prev, field]);
    toast({
      title: "Field added",
      description: `Added ${field.type} field: ${field.label}`,
    });
  };

  const handleUpdateField = (field: FormField) => {
    console.log(field, "field");
    if (!id) return;

    const updatedField: FormField = {
      ...field,
      id: id.toString(),
      name: field.name || field.label.toLowerCase().replace(/\s+/g, "-"),
    };

    setFields((prev) =>
      prev.map((f) => (f.id === id.toString() ? updatedField : f))
    );

    toast({
      title: "Field updated",
      description: `Updated ${field.type} field: ${field.label}`,
    });
  };

  const handleDeleteField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
    toast({
      title: "Field deleted",
      description: "Form field has been removed",
    });
  };

  // const handlePreview = () => {
  //   console.log("Form Preview:", fields);
  //   toast({
  //     title: "Form Preview",
  //     description: "Check the console for form structure",
  //   });
  // };

  const handleEditField = (
    id: string,
    onResetForm: (items: FormField) => void
  ) => {
    setOpen(true);
    setId(Number(id));
    const field = fields.find((field) => field.id === id);
    if (field) {
      toast({
        title: "Edit Field",
        description: `Editing ${field.type} field: ${field.label}`,
      });
      onResetForm(field);
    }
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="container mx-auto py-8 px-4 grid grid-cols-5 gap-x-4">
      <div className="space-y-4">
        {Allfields.map((field) => (
          <div key={field.label}>
            <Button onClick={() => handleAddField(field)}>{field.label}</Button>
          </div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6 col-span-2"
      >
        <AddFieldDialog
          onAddField={id ? handleUpdateField : handleAddField}
          open={open}
          onClose={onClose}
          form={form}
        />

        <AnimatePresence mode="popLayout">
          {fields.length > 0 ? (
            <Reorder.Group
              axis="y"
              values={fields}
              onReorder={setFields}
              className="space-y-4"
            >
              {fields.map((field) => (
                <Reorder.Item
                  key={field.id}
                  value={field}
                  className="cursor-move touch-none"
                >
                  <FormFieldComponent
                    field={field}
                    onDelete={handleDeleteField}
                    onEdit={(id) =>
                      handleEditField(id, (item) => {
                        form.reset({
                          type: item.type as FormFieldType,
                          label: item.label,
                          placeholder: item.placeholder,
                          descriptions: item.description,
                          options: item.options
                            ?.map((opt) => opt.label)
                            .join(", "),
                          required: item.required,
                          validation: item.validation,
                        });
                      })
                    }
                  />
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              No fields added yet. Click Add Field to start building your form.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <Tabs defaultValue={"PREVIEW"} className="col-span-2">
        <TabsList>
          <TabsTrigger value="PREVIEW">Preview</TabsTrigger>
          <TabsTrigger value="CODE">Code</TabsTrigger>
        </TabsList>
        <TabsContent value="PREVIEW">
          <Preview fields={fields} />
        </TabsContent>
        <TabsContent value="CODE">
          <CodeView fields={fields} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
