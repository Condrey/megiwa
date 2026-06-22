import { NumberInput } from "@/components/number-input/number-input";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { SaleItemSchema } from "@/lib/validation";
import { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";

interface Props {
  form: UseFormReturn<SaleItemSchema>;
}
export function FieldAmount({ form }: Props) {
  const unitPrice = form.watch("unitPrice");
  const quantity = form.watch("quantity");

  useEffect(() => {
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
            <NumberInput placeholder="amount" {...field} />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
