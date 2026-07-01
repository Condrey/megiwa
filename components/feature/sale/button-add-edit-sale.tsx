"use client";

import { SaleData } from "@/lib/types";

import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import FormAddEditSale from "./form-components/form-add-edit-sale";

interface Props extends ButtonProps {
  sale?: SaleData;
}

export default function ButtonAddEditSale({ sale, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={sale ? "Update sale" : "Create a new sale"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditSale open={open} setOpen={setOpen} sale={sale} />
    </>
  );
}
