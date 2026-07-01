import { NumberInput } from "@/components/number-input/number-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  placeholder?: string;
  title: React.ReactNode;
  className?: string;
  disabled?: boolean;
  postChange?: (value: number) => void;
}

export default function FieldNumberInput<T extends FieldValues>({
  form,
  name,
  prefix,
  suffix,
  placeholder,
  className,
  postChange,
  title,
  disabled,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel>{title}</FormLabel>
            <FormControl>
              <NumberInput
                placeholder={placeholder}
                prefix={prefix}
                suffix={suffix}
                className={className}
                postChange={postChange}
                disabled={disabled}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
