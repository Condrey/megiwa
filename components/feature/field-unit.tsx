import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allGoodQuantities, goodQuantities } from "@/lib/enums";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  placeholder?: string;
  title?: string;
}
export default function FieldUnit<T extends FieldValues>({
  form,
  name,
  title,
  placeholder,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {title && <FormLabel required>{title}</FormLabel>}
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <FormControl>
                <SelectValue
                  placeholder={placeholder || "unit"}
                  className="w-full"
                />
              </FormControl>
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectGroup>
                <SelectLabel>{title || "Allowed Units"}</SelectLabel>
                {allGoodQuantities.map((unit) => {
                  const { singular: title } = goodQuantities[unit];
                  return (
                    <SelectItem key={unit} value={unit}>
                      {title}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
}
