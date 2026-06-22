import { SaleItemSchema, SaleSchema } from "@/lib/validation";
import { Edit2Icon, NotepadTextIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
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
import { goodQuantities } from "@/lib/enums";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { useState } from "react";
import { EmptyContainer } from "../../query-container/empty-container";
import FormAddEditSaleItem from "./sale-item/form-add-edit-sale-item";

interface Props {
  form: UseFormReturn<SaleSchema>;
  className?: string;
}

export default function FieldSaleItems({ form, className }: Props) {
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
                      <TableHead className="text-muted-foreground">
                        s/n
                      </TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Item</TableHead>
                      <TableHead className="w-sm flex">Unit Price</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {commodities && !!commodities.length ? (
                      <>
                        {field.value.map((item, index) => (
                          <RowItem
                            key={index}
                            index={index}
                            item={item}
                            form={form}
                          />
                        ))}
                        <FormAddEditSaleItem
                          index={commodities.length}
                          form={form}
                          closeEditView={() => {}}
                        />
                        <TotalsRow form={form} />
                      </>
                    ) : (
                      <>
                        <FormAddEditSaleItem
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

interface RowItemProps {
  index: number;
  item: SaleItemSchema;
  form: UseFormReturn<SaleSchema>;
}
function RowItem({ index, item, form }: RowItemProps) {
  const [closeEditView, setCloseEditView] = useState(true);
  const { remove: deleteSaleItem } = useFieldArray({
    control: form.control,
    name: "saleItems",
  });
  const { plural, singular } = goodQuantities[item.goodQty];
  const unit = (item.otherGoodQty ?? item.quantity === 1) ? singular : plural;
  return (
    <>
      {closeEditView ? (
        <TableRow key={index} className="*:border-r *:last:border-r-0">
          <TableCell className="text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </TableCell>
          <TableCell>{formatNumber(item.quantity)}</TableCell>
          <TableCell>{unit}</TableCell>
          <TableCell className="max-w-xs">
            <p className="line-clamp-2 text-wrap">
              {item.commodity.name},{" "}
              <span className="text-muted-foreground text-xs">
                {item.commodity.company?.name}
              </span>
            </p>
          </TableCell>
          <TableCell>{formatCurrency(item.amount / item.quantity)}</TableCell>
          <TableCell>{formatCurrency(item.amount)}</TableCell>
          <TableCell>
            <Button
              variant={"ghost"}
              size={"icon-sm"}
              type="button"
              onClick={() => setCloseEditView(false)}
            >
              <Edit2Icon />
            </Button>
            <Button
              variant={"ghost"}
              size={"icon-sm"}
              type="button"
              onClick={() => deleteSaleItem(index)}
            >
              <Trash2Icon />
            </Button>
          </TableCell>
        </TableRow>
      ) : (
        <FormAddEditSaleItem
          form={form}
          index={index}
          saleItem={item}
          closeEditView={setCloseEditView}
        />
      )}
    </>
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
