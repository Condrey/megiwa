import { NumberInput } from "@/components/number-input/number-input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { ZapIcon } from "lucide-react";
import { useEffect } from "react";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  totalAmount: number;
}

export default function FieldTotalAmount<T extends FieldValues>({
  form,
  name,
  totalAmount,
}: Props<T>) {
  useEffect(() => {
    form.setValue(name, totalAmount as FieldPathValue<T, typeof name>, {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [totalAmount, form, name]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, formState }) => {
        if (formState.isDirty) {
          //   form.setValue("totalAmount", totalAmount);
        }
        return (
          <FormItem>
            <FormLabel>
              Total Amount{" "}
              <span className="inline *:inline text-muted-foreground">
                (<ZapIcon className="size-4 fill-muted-foreground" /> Auto)
              </span>
            </FormLabel>
            <FormControl>
              <NumberInput placeholder="total amount" {...field} />
            </FormControl>
            <FormDescription />
          </FormItem>
        );
      }}
    />
  );
}
