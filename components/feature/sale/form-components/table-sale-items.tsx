import { SaleSchema } from "@/lib/validation";
import { NotepadTextIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency } from "@/lib/utils";
import { EmptyContainer } from "../../../query-container/empty-container";
import SaleItemEditor from "../sale-item/sale-item-editor";
import { RowItemSalesItems } from "./row-item-sales-items";

interface Props {
  form: UseFormReturn<SaleSchema>;
  className?: string;
}

export default function TableSaleItems({ form, className }: Props) {
  const commodities = form.watch("saleItems");

  return (
    <Card className={cn("flex-1 max-w-9xl", className)}>
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>Sale Items</CardTitle>
          <CardDescription>
            These are the items purchased in the sale
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <FormField
          control={form.control}
          name="saleItems"
          render={({ field }) => (
            <FormItem>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow className="*:border-r *:last:border-r-0 *:font-bold *:uppercase ">
                      <TableHead className="text-muted-foreground w-12">
                        s/n
                      </TableHead>
                      <TableHead className="w-24">Qty</TableHead>
                      <TableHead className="w-56">Unit</TableHead>
                      <TableHead className="w-60">Item</TableHead>
                      <TableHead className="min-w-56">Unit Price</TableHead>
                      <TableHead className="w-56">Amount</TableHead>
                      <TableHead className="w-56">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commodities && !!commodities.length ? (
                      <>
                        {field.value.map((item, index) => (
                          <RowItemSalesItems
                            key={index}
                            index={index}
                            item={item}
                            form={form}
                          />
                        ))}
                        <SaleItemEditor
                          index={commodities.length}
                          form={form}
                          closeEditView={() => {}}
                        />
                        <TotalsRow form={form} />
                      </>
                    ) : (
                      <>
                        <SaleItemEditor
                          index={commodities?.length || 0}
                          form={form}
                          closeEditView={() => {}}
                        />
                        <TableRow>
                          <TableCell colSpan={7}>
                            <EmptyContainer
                              description="Start adding sale items here"
                              title="Missing sale items"
                              icon={NotepadTextIcon}
                            ></EmptyContainer>
                          </TableCell>
                        </TableRow>
                      </>
                    )}
                  </TableBody>
                </Table>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

function TotalsRow({ form }: { form: UseFormReturn<SaleSchema> }) {
  const totalAmount = form
    .watch("saleItems")
    .reduce((amm, total) => amm + total.amount, 0);
  return (
    <TableRow>
      <TableCell
        colSpan={5}
        className="text-lg font-bold text-muted-foreground"
      >
        Total Amount
      </TableCell>
      <TableCell colSpan={2} className="font-bold text-muted-foreground">
        {formatCurrency(totalAmount)}
      </TableCell>
    </TableRow>
  );
}
