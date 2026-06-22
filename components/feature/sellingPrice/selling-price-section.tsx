import { NumberInput } from "@/components/number-input/number-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { SellingPrice } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { SellingPriceSchema } from "@/lib/validation";
import { UseFormReturn } from "react-hook-form";
import FieldDate from "../field-date";
import FieldOtherUnit from "../field-other-unit";
import FieldUnit from "../field-unit";
import { useUpsertSellingPriceMutation } from "./mutation";

interface Props {
  form: UseFormReturn<SellingPriceSchema>;
  setOpen: (open: boolean) => void;
  sellingPrice?: SellingPrice;
  className?: string;
}

export default function SellingPriceSection({
  form,
  setOpen,
  sellingPrice,
  className,
}: Props) {
  const { mutate, isPending } = useUpsertSellingPriceMutation();
  function submitForm(data: SellingPriceSchema) {
    mutate(data, {
      onSuccess: () => setOpen(false),
    });
  }
  return (
    <form
      onSubmit={form.handleSubmit(submitForm)}
      className={cn(" space-y-4", className)}
    >
      <div className="flex gap-4 flex-col md:flex-row items-start w-full *:flex-1 max-w-4xl">
        <FieldUnit form={form} name="goodQty" title="Unit" />
        <FieldOtherUnit
          form={form}
          goodQty="goodQty"
          otherGoodQty="otherGoodQty"
          title="Custom unit"
        />
        <FormField
          control={form.control}
          name={"currency"}
          render={({ field }) => (
            <FormItem>
              <FormLabel required>Currency</FormLabel>
              <FormControl>
                <Input placeholder="currency..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex  gap-4 items-start flex-col md:flex-row-reverse  w-full *:flex-1 max-w-4xl">
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Item prices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name={"baseAmount"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>Retail price</FormLabel>
                    <FormControl>
                      <NumberInput placeholder="base amount..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"wholesaleAmount"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>wholesale price</FormLabel>
                    <FormControl>
                      <NumberInput
                        placeholder="wholesale amount..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name={"isCurrentPrice"}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex bg-muted/50 rounded-md px-2 py-3 gap-2">
                        <Checkbox
                          id="isCurrentPrice"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <FormLabel htmlFor="isCurrentPrice">
                          Mark as current selling price
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FieldDate
                form={form}
                name="effectiveDateAt"
                title="Effective date"
              />
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Optional item prices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name={"specialBaseAmount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Special retail price</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="special base amount..."
                      {...field}
                      value={field.value!}
                    />
                  </FormControl>
                  <FormDescription>This is optional</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"specialWholesaleAmount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>special wholesale price</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="special wholesaleAmount amount..."
                      {...field}
                      value={field.value!}
                    />
                  </FormControl>
                  <FormDescription>This is optional</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"promotionAmount"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Promotion price</FormLabel>
                  <FormControl>
                    <NumberInput
                      placeholder="promotion amount..."
                      {...field}
                      value={field.value!}
                    />
                  </FormControl>
                  <FormDescription>This is optional</FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>

      <FormFooter>
        <LoadingButton
          type="button"
          loading={isPending}
          onClick={form.handleSubmit(submitForm)}
        >
          {sellingPrice ? "Update selling price" : "Create selling price"}
        </LoadingButton>
      </FormFooter>
    </form>
  );
}
