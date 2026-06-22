"use client";

import { ButtonProps } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { useTransition } from "react";
import { toast } from "sonner";

interface Props extends ButtonProps {
  decision: "accept" | "deny";
  invitationId: string;
}

export default function ButtonAcceptDenyInvitation({
  decision,
  invitationId,
  ...props
}: Props) {
  const [isPending, startTransition] = useTransition();

  function handleButtonClick() {
    startTransition(async () => {
      if (decision === "accept") {
        const { error } = await authClient.organization.acceptInvitation({
          invitationId,
        });
        if (error)
          toast.error("Invitation acceptance failed", {
            description: error.message,
          });
      } else if (decision === "deny") {
        const { error } = await authClient.organization.cancelInvitation({
          invitationId,
        });
        if (error)
          toast.error("Invitation denial failed", {
            description: error.message,
          });
      }
    });
  }
  return (
    <LoadingButton loading={isPending} onClick={handleButtonClick} {...props} />
  );
}
