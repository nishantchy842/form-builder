import { motion } from "framer-motion";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormField } from "@/type/form";

interface FormFieldProps {
  field: FormField;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

export function FormFieldComponent({
  field,
  onDelete,
  onEdit,
}: FormFieldProps) {
  const renderField = () => {
    switch (field.type) {
      case "text":
      case "email":
      case "password":
      case "number":
        return (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full"
          />
        );
      case "textarea":
        return <Textarea placeholder={field.placeholder} className="w-full" />;
      case "select":
        return (
          <Select>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
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
            <Checkbox id={field.id} />
            <label
              htmlFor={field.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </label>
          </div>
        );
      case "radio":
        return (
          <RadioGroup>
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value}
                  id={`${field.id}-${option.value}`}
                />
                <Label htmlFor={`${field.id}-${option.value}`}>
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-4 bg-white rounded-lg shadow-sm border"
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <Label className="text-base font-semibold">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => onEdit(field.id)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(field.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {renderField()}
    </motion.div>
  );
}
