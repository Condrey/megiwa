import { NumberInput } from "@/components/number-input/number-input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SaleItemSchema } from "@/lib/validation";
import { useLayoutEffect } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";

interface Props {
  form: UseFormReturn<SaleItemSchema>;
}
export function FieldAmount({ form }: Props) {
  const unitPrice = useWatch({ control: form.control, name: "unitPrice" });
  const quantity = useWatch({ control: form.control, name: "quantity" });

  useLayoutEffect(() => {
    const price = unitPrice * quantity;
    form.clearErrors("amount");
    form.setValue("amount", price || 0);
  }, [form, quantity, unitPrice]);

  if (!quantity) {
    return <span className="">quantity not specified</span>;
  }
  if (!unitPrice) {
    return <span className="">Missing unit price</span>;
  }

  return (
    <FormField
      control={form.control}
      name={"amount"}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <NumberInput
              disabled
              placeholder="amount"
              prefix={form.getValues("currency") || "UGX"}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
