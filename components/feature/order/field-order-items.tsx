import { OrderItemSchema, OrderSchema } from "@/lib/validation";
import { Edit2Icon, NotepadTextIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { goodQuantities } from "@/lib/enums";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { useState } from "react";
import { EmptyContainer } from "../../query-container/empty-container";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { FormField, FormItem, FormMessage } from "../../ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import FormAddEditOrderItem from "./order-item/form-add-edit-order-item";

interface Props {
  form: UseFormReturn<OrderSchema>;
  className?: string;
}

export default function FieldOrderItems({ form, className }: Props) {
  const commodities = form.watch("orderItems");

  return (
    <Card className={cn("flex-1 ", className)}>
      <CardHeader className="flex items-center justify-between gap-4">
        <div>
          <CardTitle>Order Items</CardTitle>
          <CardDescription>
            These are the items purchased in the order
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <FormField
          control={form.control}
          name="orderItems"
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
                      <TableHead>Unit Price</TableHead>
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
                        <FormAddEditOrderItem
                          index={commodities.length}
                          form={form}
                          closeEditView={() => {}}
                        />
                        <TotalsRow form={form} />
                      </>
                    ) : (
                      <>
                        <FormAddEditOrderItem
                          index={commodities?.length || 0}
                          form={form}
                          closeEditView={() => {}}
                        />
                        <TableRow>
                          <TableCell colSpan={7}>
                            <EmptyContainer
                              description="Start adding order items here"
                              title="Missing order items"
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
  item: OrderItemSchema;
  form: UseFormReturn<OrderSchema>;
}
function RowItem({ index, item, form }: RowItemProps) {
  const [closeEditView, setCloseEditView] = useState(true);
  const { remove: deleteOrderItem } = useFieldArray({
    control: form.control,
    name: "orderItems",
  });

  return (
    <>
      {closeEditView ? (
        <TableRow key={index} className="*:border-r *:last:border-r-0">
          <TableCell className="text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </TableCell>
          <TableCell>{formatNumber(item.quantity)}</TableCell>
          <TableCell>{goodQuantities[item.goodQty].plural}</TableCell>
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
              onClick={() => deleteOrderItem(index)}
            >
              <Trash2Icon />
            </Button>
          </TableCell>
        </TableRow>
      ) : (
        <FormAddEditOrderItem
          form={form}
          index={index}
          orderItem={item}
          closeEditView={setCloseEditView}
        />
      )}
    </>
  );
}

function TotalsRow({ form }: { form: UseFormReturn<OrderSchema> }) {
  const totalAmount = form
    .watch("orderItems")
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
