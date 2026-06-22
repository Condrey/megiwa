"use client";

import { BuyerData } from "@/lib/types";

import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import FormAddEditBuyer from "./form-add-edit-buyer";

interface Props extends ButtonProps {
  buyer?: BuyerData;
}

export default function ButtonAddEditBuyer({ buyer, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={buyer ? "Update buyer" : "Create a new buyer"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditBuyer open={open} setOpen={setOpen} buyer={buyer} />
    </>
  );
}
