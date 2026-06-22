import {
  Form,
  FormControl,
  FormField,
  FormFooter,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/ui/loading-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BuyerData } from "@/lib/types";
import { buyerSchema, BuyerSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpsertBuyerMutation } from "./mutation";

interface Props {
  buyer?: BuyerData;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditBuyer({ buyer, open, setOpen }: Props) {
  const form = useForm<BuyerSchema>({
    resolver: zodResolver(buyerSchema),
    values: {
      id: buyer?.id || "",
      contact: buyer?.contact || "",
      name: buyer?.name || "",
      email: buyer?.email,
    },
  });

  const { mutate, isPending } = useUpsertBuyerMutation();
  function submitForm(data: BuyerSchema) {
    mutate(data, {
      onSuccess: () => setOpen(false),
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            {buyer ? "Update buyer" : "Create a new buyer"}
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
                    <FormLabel required>Buyer</FormLabel>
                    <FormControl>
                      <Input placeholder="name of the buyer..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FormField
                  control={form.control}
                  name={"contact"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>Contact</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="contact information..."
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
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
                      <Input
                        placeholder="email information..."
                        {...field}
                        value={field.value!}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormFooter>
                <LoadingButton
                  type="button"
                  loading={isPending}
                  onClick={form.handleSubmit(submitForm)}
                >
                  {buyer ? "Update buyer" : "Create buyer"}
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
