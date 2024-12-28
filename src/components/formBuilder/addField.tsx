"use client";

import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FormField as FormFieldType } from "@/type/form";
import { FormSchema } from "../schema";
import { Textarea } from "../ui/textarea";

interface AddFieldDialogProps {
  open: boolean;
  onClose: () => void;
  onAddField: (field: FormFieldType) => void;
  form: UseFormReturn<FormSchema>;
}

export function AddFieldDialog({
  onAddField,
  open,
  onClose,
  form,
}: AddFieldDialogProps) {
  function onSubmit(values: FormSchema) {
    const newField: FormFieldType = {
      id: crypto.randomUUID(),
      type: values.type,
      label: values.label,
      placeholder: values.placeholder,
      required: values.required,
      options:
        (values.type === "select" || values.type === "radio") && values.options
          ? values.options.split(",").map((opt) => ({
              label: opt.trim(),
              value: opt.trim().toLowerCase().replace(/\s+/g, "-"),
            }))
          : undefined,
      name: values.label.toLowerCase().replace(/\s+/g, "-"),
    };

    onAddField(newField);
    onClose();
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={true}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a field type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="textarea">Textarea</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="password">Password</SelectItem>
                      <SelectItem value="select">Select</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter field label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="placeholder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placeholder</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter placeholder text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descriptions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter field description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="required"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Required</FormLabel>
                    <FormDescription>
                      Make this field required in the form
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save Field</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
