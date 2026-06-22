"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { Organization } from "better-auth/plugins";
import { useState } from "react";
import FormAddEditOrganization from "./form-add-edit-organization";

interface Props extends ButtonProps {
  organization?: Organization;
}

export default function ButtonAddEditOrganization({
  organization,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={
          organization ? "Update organization" : "Create a new organization"
        }
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormAddEditOrganization
        open={open}
        setOpen={setOpen}
        organizationToEdit={organization}
      />
    </>
  );
}
