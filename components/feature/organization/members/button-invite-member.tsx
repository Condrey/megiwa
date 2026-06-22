"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({ email: z.email() });
type Schema = z.infer<typeof schema>;

export default function ButtonInviteMember({ ...props }: ButtonProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { data } = authClient.useSession();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });
  async function submitEmail({ email }: Schema) {
    setError(undefined);
    //Perform the logic
    const { error } = await authClient.organization.inviteMember({
      email,
      role: "member",
      organizationId: data?.session.activeOrganizationId || undefined,
      resend: true,
    });
    if (error) {
      setError(error?.message || undefined);
    } else {
      toast.success("Invitation sent successfully.");
      setOpen(false);
      form.reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          title={"Invite member"}
          onClick={() => setOpen(true)}
          {...props}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite A member</DialogTitle>
          <DialogDescription>{`Enter the member's email here below;`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitEmail)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      placeholder="e.g., someone@gmail.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        {error && (
          <div role="alert" className="text-destructive">
            {" "}
            {error}
          </div>
        )}
        <DialogFooter>
          <LoadingButton
            loading={form.formState.isSubmitting}
            onClick={() => form.handleSubmit(submitEmail)()}
            type="submit"
          >
            Send invitation
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
