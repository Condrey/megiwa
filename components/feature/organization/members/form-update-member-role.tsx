"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import LoadingButton from "@/components/ui/loading-button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useUpdateMemberRoleMutation } from "./mutation";

const schema = z.object({ role: z.enum(["owner", "admin", "member"]) });
type Schema = z.infer<typeof schema>;

interface Props {
  organizationSlug: string;
  organizationId: string;
  memberId: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function FormUpdateMemberRole({
  organizationId,
  memberId,
  organizationSlug,
  open,
  setOpen,
}: Props) {
  const { mutate, isPending, error } =
    useUpdateMemberRoleMutation(organizationSlug);

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { role: "member" },
  });
  async function updateRole({ role }: Schema) {
    mutate(
      { role, memberId, organizationId },
      {
        onSuccess: () => setOpen(false),
      },
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member role update</DialogTitle>
          <DialogDescription>{`Choose a new role from here below;`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(updateRole)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <FormControl>
                        <SelectValue />
                      </FormControl>
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        <SelectLabel>Choose a role from here</SelectLabel>
                        {["member", "admin", "owner"].map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div role="alert" className="text-destructive">
                {error.message || "Failed to update role"}
              </div>
            )}
            <div>
              <LoadingButton loading={isPending}>Update</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
