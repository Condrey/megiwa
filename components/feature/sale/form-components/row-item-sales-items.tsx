import { SaleItemSchema, SaleSchema } from "@/lib/validation";
import { UseFormReturn } from "react-hook-form";

import { useState } from "react";
import SaleItemEditor from "../sale-item/sale-item-editor";
import { SaleItemViewer } from "../sale-item/sale-item-viewer";

interface RowItemProps {
  index: number;
  item: SaleItemSchema;
  form: UseFormReturn<SaleSchema>;
}
export function RowItemSalesItems({ index, item, form }: RowItemProps) {
  const [closeEditView, setCloseEditView] = useState(true);

  return (
    <>
      {closeEditView ? (
        <SaleItemViewer
          form={form}
          index={index}
          item={item}
          closeEditorView={(close) => {
            form.setError(`saleItems.${index}`, {
              message: `Remember to save changes in sales item ${String(index + 1).padStart(2, "0")} `,
            });
            setCloseEditView(close);
          }}
        />
      ) : (
        <SaleItemEditor
          form={form}
          index={index}
          saleItem={item}
          closeEditView={(close) => {
            form.clearErrors(`saleItems.${index}`);
            setCloseEditView(close);
          }}
        />
      )}
    </>
  );
}
