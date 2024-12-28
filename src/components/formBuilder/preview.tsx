/* eslint-disable @typescript-eslint/no-explicit-any */

import { cn } from "@/lib/utils";
import { FormField as FieldTypes } from "@/type/form";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarIcon } from "lucide-react";
import React from "react";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

type PropsType = {
  fields: FieldTypes[];
};

export const renderField = (
  field: ControllerRenderProps<FieldValues, string>,
  item: FieldTypes
) => {
  switch (item.type) {
    case "text":
    case "email":
    case "password":
    case "number":
      return <Input {...field} className="w-full" />;
    case "textarea":
      return <Textarea {...field} className="w-full" />;
    case "select":
      return (
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder={item.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {item.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={item.id} {...field} />
          <label
            htmlFor={item.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item.label}
          </label>
        </div>
      );
    case "radio":
      return (
        <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
          {item.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${item.id}-${option.value}`}
              />
              <Label htmlFor={`${item.id}-${option.value}`}>
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      );
    case "date":
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                field.onChange(date);
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      );
    case "switch":
      return <Switch onCheckedChange={field.onChange} />;
    default:
      return null;
  }
};

export default function Preview({ fields }: PropsType) {
  const form = useForm();
  const [data, setData] = React.useState<any>({});

  const onSubmit = (data: any) => {
    console.log(data);
    setData(data);
  };

  if (fields.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-500"
      >
        No fields added yet. Click Add Field to start building your form.
      </motion.div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {fields.map((item) => (
          <FormField
            key={item.id}
            name={item.name}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{item.label}</FormLabel>
                <FormControl>{renderField(field, item)}</FormControl>
                <FormDescription>this is description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type="submit">Submit</Button>
        {data && <p>{JSON.stringify(data, null, 2)}</p>}
      </form>
    </Form>
  );
}
