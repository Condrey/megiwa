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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import { authClient } from "@/lib/auth-client";
import { DEFAULT_PASSWORD } from "@/lib/constants";
import { signUpSchema, SignUpSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAddMemberMutation } from "./mutation";

export default function ButtonAddMember({ ...props }: ButtonProps) {
  const [open, setOpen] = useState(false);
  const { data } = authClient.useSession();

  const { mutate, isPending, error } = useAddMemberMutation();
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    values: {
      email: "",
      name: "",
      password: DEFAULT_PASSWORD,
      passwordConfirmation: DEFAULT_PASSWORD,
    },
  });
  async function submitEmail(input: SignUpSchema) {
    mutate({ input, organizationId: data?.session.activeOrganizationId || "" });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          title={"Add member"}
          onClick={() => setOpen(true)}
          {...props}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a member</DialogTitle>
          <DialogDescription>{`Enter the member's name and email here below;`}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitEmail)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g., John Doe" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
            {error && (
              <div role="alert" className="text-destructive">
                {error.message}
              </div>
            )}
            <DialogFooter>
              <LoadingButton loading={isPending} type="submit">
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
