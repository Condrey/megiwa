"use client";

import { CompanyData } from "@/lib/types";

import { useState } from "react";
import { Button, ButtonProps } from "../../ui/button";
import FormAddEditCompany from "./form-add-edit-company";

interface Props extends ButtonProps {
  company?: CompanyData;
}

export default function ButtonAddEditCompany({ company, ...props }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={company ? "Update company" : "Create a new company"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditCompany open={open} setOpen={setOpen} company={company} />
    </>
  );
}
