import FieldCompany from "@/components/feature/field-company";
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
import { Textarea } from "@/components/ui/textarea";
import { CommodityData } from "@/lib/types";
import {
  CommodityMetadataSchema,
  commoditySchema,
  CommoditySchema,
  CompanySchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpsertCommodityMutation } from "./mutation";

interface Props {
  company?: CompanySchema;
  commodity?: CommodityData;
  open: boolean;
  setOpen: (open: boolean) => void;
}
export default function FormAddEditCommodity({
  commodity,
  company,
  open,
  setOpen,
}: Props) {
  const form = useForm<CommoditySchema>({
    resolver: zodResolver(commoditySchema),
    values: {
      id: commodity?.id || "",
      name: commodity?.name || "",
      company: (commodity?.company || company) as CompanySchema,
      commodityMetadata:
        commodity?.commodityMetadata as CommodityMetadataSchema,
    },
  });

  const { mutate, isPending } = useUpsertCommodityMutation();
  function submitForm(data: CommoditySchema) {
    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>
            {commodity ? "Update commodity" : "Create a new commodity"}
          </SheetTitle>
        </SheetHeader>
        <div className="h-svh px-4 overflow-y-auto">
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
                    <FormLabel>Commodity</FormLabel>
                    <FormControl>
                      <Input placeholder="name of the .." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FieldCompany form={form} name="company" />
              </div>
              <div className="grid md:grid-cols-2 gap-4 items-center w-full *:flex-1 max-w-4xl">
                <FormField
                  control={form.control}
                  name={`commodityMetadata.category`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`category...`}
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`commodityMetadata.packaging`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Packaging</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`packaging...`}
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`commodityMetadata.size`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Size</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`size...`}
                          {...field}
                          value={field.value!}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`commodityMetadata.color`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={`color...`}
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
                name={`commodityMetadata.otherDescription`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Other description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`other descriptions...`}
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
                  {commodity ? "Update commodity" : "Create commodity"}
                </LoadingButton>
              </FormFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
