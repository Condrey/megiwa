"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { organizationSchema, OrganizationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "better-auth/plugins";
import { useForm } from "react-hook-form";
import { useUpsertOrganizationMutation } from "./mutation";

interface Props {
  organizationToEdit?: Organization;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditOrganization({
  organizationToEdit,
  open,
  setOpen,
}: Props) {
  const form = useForm<OrganizationSchema>({
    resolver: zodResolver(organizationSchema),
    values: {
      id: organizationToEdit?.id || "",
      name: organizationToEdit?.name || "",
      slug: organizationToEdit?.slug || "",
      metadata: organizationToEdit?.metadata || undefined,
      logo: organizationToEdit?.logo || "",
      keepCurrentActiveOrganization: true,
    },
  });

  const { mutate, isPending, error } = useUpsertOrganizationMutation();
  function submitForm(input: OrganizationSchema) {
    mutate(input, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <div className="px-4">
          <SheetHeader className="px-0">
            <SheetTitle>Create your Entity</SheetTitle>
            <SheetDescription>
              Enter information about the organization
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-4 w-full"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. Osborn Deluxe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g., osborn-deluxe"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Enter slug separated by hyphens.
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="keepCurrentActiveOrganization"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="keepCurrentActiveOrganization"
                        />
                        <FormLabel htmlFor="keepCurrentActiveOrganization">
                          keep the current active organization active after
                          creating a new one
                        </FormLabel>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div role="alert" className="text-destructive">
                {error?.message}
              </div>
              <LoadingButton loading={isPending} className="w-full">
                {organizationToEdit
                  ? "Update organization"
                  : "Create organization"}
              </LoadingButton>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
