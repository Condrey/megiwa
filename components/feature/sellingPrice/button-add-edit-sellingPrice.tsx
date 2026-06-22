"use client";

import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { SellingPrice } from "@/lib/generated/prisma/client";
import { CommodityData } from "@/lib/types";
import { CommoditySchema } from "@/lib/validation";
import { useState } from "react";
import { Button, ButtonProps } from "../../ui/button";
import { useCommodityWithInitialDataQuery } from "../commodity/query";
import FormAddEditSellingPrice from "./form-add-edit-sellingPrice";

interface Props extends ButtonProps {
  sellingPrice?: SellingPrice;
  commodity: CommodityData | CommoditySchema;
}

export default function ButtonAddEditSellingPrice({
  sellingPrice,
  commodity,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  const query = useCommodityWithInitialDataQuery({
    id: commodity.id,
    initialData: commodity as CommodityData,
  });
  const { data, status } = query;
  if (status === "error")
    return <ErrorContainer query={query} errorMessage="" />;
  if (!data) return <EmptyContainer title="Commodity Not found" />;

  return (
    <>
      <Button
        type="button"
        title={
          sellingPrice ? "Update sellingPrice" : "Create a new sellingPrice"
        }
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditSellingPrice
        commodity={data}
        open={open}
        setOpen={setOpen}
        sellingPrice={sellingPrice}
      />
    </>
  );
}
