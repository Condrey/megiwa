import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { CompanyData } from "@/lib/types";
import { companySchema, CompanySchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpsertCompanyMutation } from "./mutation";

interface Props {
  company?: CompanyData;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditCompany({ company, open, setOpen }: Props) {
  const form = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    values: {
      id: company?.id || "",
      contact: company?.contact || "",
      name: company?.name || "",
      email: company?.email || "",
      location: company?.location || "",
      owner: company?.owner || "",
    },
  });

  const { mutate, isPending } = useUpsertCompanyMutation();
  function submitForm(data: CompanySchema) {
    mutate(data, {
      onSuccess: () => setOpen(false),
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            {company ? "Update company" : "Create a new company"}
          </SheetTitle>
        </SheetHeader>
        <div className="h-svh px-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submitForm)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name={"name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="name of the company..." {...field} />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FormField
                  control={form.control}
                  name={"owner"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner of Company</FormLabel>
                      <FormControl>
                        <Input placeholder="owner name..." {...field} />
                      </FormControl>
                      <FormDescription />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"contact"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contact</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="contact information..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email information..." {...field} />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"location"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Textarea
                        cols={4}
                        placeholder="location of company..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
              <FormFooter>
                <LoadingButton
                  type="button"
                  loading={isPending}
                  onClick={form.handleSubmit(submitForm)}
                >
                  {company ? "Update company" : "Create company"}
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
