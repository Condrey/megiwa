import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { GoodQty } from "@/lib/generated/prisma/enums";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  goodQty: FieldPath<T>;
  otherGoodQty: FieldPath<T>;
  placeholder?: string;
  title?: string;
}
export default function FieldOtherUnit<T extends FieldValues>({
  form,
  goodQty,
  otherGoodQty,
  title,
  placeholder,
}: Props<T>) {
  const isOther = form.watch(goodQty) === GoodQty.OTHER;

  return (
    <>
      {isOther ? (
        <FormField
          control={form.control}
          name={otherGoodQty}
          render={({ field }) => (
            <FormItem>
              {title && <FormLabel required>{title}</FormLabel>}
              <FormControl>
                <Input
                  placeholder={placeholder || "unit"}
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ) : null}
    </>
  );
}
