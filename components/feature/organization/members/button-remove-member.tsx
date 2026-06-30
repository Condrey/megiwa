"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoadingButton from "@/components/ui/loading-button";
import { UserAvatar } from "@/components/user-avatar";
import { ActiveOrganization } from "@/lib/auth";
import { useState } from "react";
import { useRemoveMemberMutation } from "./mutation";

interface Props extends ButtonProps {
  member: ActiveOrganization["members"][0];
}
export default function ButtonRemoveMember({ member, ...props }: Props) {
  const { user, organizationId, id, role, createdAt } = member;
  const [open, setOpen] = useState(false);

  const { mutate, isPending, error } = useRemoveMemberMutation();

  async function removeMember() {
    mutate(
      { memberIdOrEmail: id, organizationId },
      {
        onSuccess() {
          setOpen(false);
        },
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          title={"Remove member"}
          onClick={() => setOpen(true)}
          {...props}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove {role}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-3 ">
            <UserAvatar image={user.image} name={user.name} />
            <div className="flex flex-col gap-0.5">
              <span className="space-x-4">{user.name}</span>
              <span className="text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
          <DialogDescription>
            This action shall remove this user from this organization and not
            affect other information.
          </DialogDescription>
          {error && (
            <div role="alert" className="text-destructive">
              {error.message}
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <LoadingButton
            loading={isPending}
            type="button"
            onClick={removeMember}
          >
            Confirm
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
