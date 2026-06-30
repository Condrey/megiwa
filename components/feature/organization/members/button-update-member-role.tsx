"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useState } from "react";
import FormUpdateMemberRole from "./form-update-member-role";

interface Props extends ButtonProps {
  organizationSlug: string;
  organizationId: string;
  memberId: string;
}

export default function ButtonUpdateMemberRole({
  organizationId,
  memberId,
  organizationSlug,
  ...props
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        title={"Update member role"}
        onClick={() => setOpen(true)}
        {...props}
      />
      <FormUpdateMemberRole
        memberId={memberId}
        organizationId={organizationId}
        organizationSlug={organizationSlug}
        open={open}
        setOpen={setOpen}
      />{" "}
    </>
  );
}
