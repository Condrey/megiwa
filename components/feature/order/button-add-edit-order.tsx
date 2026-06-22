"use client";

import { OrderData } from "@/lib/types";

import { useState } from "react";
import { Button, ButtonProps } from "../../ui/button";
import FormAddEditOrder from "./form-add-edit-order";

interface Props extends ButtonProps {
  order?: OrderData;
}

export default function ButtonAddEditOrder({ order, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={order ? "Update order" : "Create a new order"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditOrder open={open} setOpen={setOpen} order={order} />
    </>
  );
}
