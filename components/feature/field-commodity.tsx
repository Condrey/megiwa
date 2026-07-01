import ButtonAddEditCommodity from "@/components/feature/commodity/button-add-edit-commodity";
import {
  ChosenCommodityCommandItem,
  CommandItemCommodity,
} from "@/components/feature/commodity/chosen-commodity-commodity-item";
import ErrorContainer from "@/components/query-container/error-container";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { CompanySchema } from "@/lib/validation";
import { ChevronsUpDownIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { useCommoditiesQuery } from "./commodity/query";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  title?: string;
  placeholder?: string;
  company?: CompanySchema;
}

export default function FieldCommodity<T extends FieldValues>({
  form,
  name,
  title,
  placeholder,
  company,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const query = useCommoditiesQuery();
  const { data: commodities, status } = query;
  if (status === "error") {
    return (
      <ErrorContainer
        errorMessage="Failed to fetch commodities"
        query={query}
        className="min-h-0"
      />
    );
  }
  if (status === "pending") {
    return (
      <div className="w-full space-y-3">
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  type="button"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {field.value.id ? (
                    <ChosenCommodityCommandItem
                      commodity={commodities.find(
                        (commodity) => commodity.id === field.value.id,
                      )}
                    />
                  ) : (
                    title || "Choose commodity..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-fit  p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder || "Search commodities..."}
                />
                <CommandList>
                  <CommandEmpty className="space-y-3">
                    <span className="block">No commodity found.</span>
                    <ButtonAddEditCommodity company={company}>
                      <PlusIcon />
                      New Commodity
                    </ButtonAddEditCommodity>
                  </CommandEmpty>
                  <CommandGroup>
                    {commodities.map((commodity) => (
                      <CommandItem
                        key={commodity.id}
                        value={commodity.name}
                        onSelect={(currentValue) => {
                          console.log({ currentValue });
                          form.setValue(
                            name,
                            commodity as FieldPathValue<T, typeof name>,
                          );
                          form.clearErrors(name);
                          setOpen(false);
                        }}
                      >
                        <CommandItemCommodity
                          commodity={commodity}
                          isChecked={field.value.id === commodity.id}
                          className="p-0"
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
}
