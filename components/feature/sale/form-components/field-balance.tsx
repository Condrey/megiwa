import { cn } from "@/lib/utils";
import { SaleSchema } from "@/lib/validation";
import { useEffect, useState } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import FieldNumberInput from "../../field-number-input";

interface Props {
  form: UseFormReturn<SaleSchema>;
  previousPayments: number | undefined;
}

export default function FieldBalance({ form, previousPayments }: Props) {
  const totalAmount = useWatch({ control: form.control, name: "totalAmount" });
  const payment = useWatch({ control: form.control, name: "payment" });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    function handleChange() {
      const balance =
        (payment || 0) - (totalAmount || 0) + (previousPayments || 0);
      form.setValue("balance", balance, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setBalance(balance);
    }
    handleChange();
  }, [totalAmount, form, payment, previousPayments]);
  const isDebt = balance < 0;
  return (
    <>
      {/* <pre>{JSON.stringify({ previousPayments })}</pre> */}
      <FieldNumberInput
        form={form}
        name="balance"
        title="Balance"
        prefix="UGX"
        suffix={
          (balance || 0) !== 0 ? (
            <span
              className={cn(
                "ms-2 ",
                isDebt ? "text-destructive" : "text-green-500",
              )}
            >{`(${isDebt ? "- Debt" : "+ Overdraft"})`}</span>
          ) : null
        }
        disabled
      />
    </>
  );
}
