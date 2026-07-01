import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { goodQuantities, saleTypes } from "@/lib/enums";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { SaleItemSchema, SaleSchema } from "@/lib/validation";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { flattenCommodityMetadata } from "../../commodity/utils";

interface Props {
  index: number;
  item: SaleItemSchema;
  form: UseFormReturn<SaleSchema>;
  closeEditorView: (close: boolean) => void;
}
export function SaleItemViewer({ index, item, form, closeEditorView }: Props) {
  const { plural, singular } = goodQuantities[item.goodQty];
  const unit = item.otherGoodQty ?? (item.quantity === 1 ? singular : plural);
  const { remove: deleteSaleItem } = useFieldArray({
    control: form.control,
    name: "saleItems",
  });
  return (
    <TableRow key={index} className="*:border-r *:last:border-r-0">
      <TableCell className="text-muted-foreground w-12">
        {String(index + 1).padStart(2, "0")}
      </TableCell>
      <TableCell className="w-24">{formatNumber(item.quantity)}</TableCell>
      <TableCell className="w-56">{unit}</TableCell>
      <TableCell className="w-60">
        <p className="line-clamp-2 text-wrap">
          {item.commodity.name}
          <span className="text-muted-foreground text-xs">
            - {item.commodity.company?.name || "No registered company"}
          </span>
        </p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          {flattenCommodityMetadata(item.commodity.commodityMetadata)}
        </p>
      </TableCell>
      <TableCell className="w-56">
        {formatCurrency(item.amount / item.quantity)}
        <span className="text-muted-foreground ml-2">
          ({saleTypes[item.saleType].abbreviation})
        </span>
      </TableCell>
      <TableCell className="w-56">{formatCurrency(item.amount)}</TableCell>
      <TableCell className="w-56 space-x-3">
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => {
            closeEditorView(false);
          }}
        >
          <Edit2Icon />
        </Button>
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => deleteSaleItem(index)}
        >
          <Trash2Icon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
