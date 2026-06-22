"use client";

import { CommodityData } from "@/lib/types";

import { CompanySchema } from "@/lib/validation";
import { useState } from "react";
import { Button, ButtonProps } from "../../ui/button";
import FormAddEditCommodity from "./form-add-edit-commodity";

interface Props extends ButtonProps {
  commodity?: CommodityData;
  company?: CompanySchema;
}

export default function ButtonAddEditCommodity({
  commodity,
  company,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={commodity ? "Update commodity" : "Create a new commodity"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditCommodity
        open={open}
        setOpen={setOpen}
        commodity={commodity}
        company={company}
      />
    </>
  );
}
