import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { EmptyContainer } from "../query-container/empty-container";
import ErrorContainer from "../query-container/error-container";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import ButtonAddEditCompany from "./company/button-add-edit-company";
import {
  ChosenCompanyCommandItem,
  CommandItemCompany,
} from "./company/chosen-company-command-item";
import { useCompaniesQuery } from "./company/query";

interface Props<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  placeholder?: string;
  title?: string;
}

export default function FieldCompany<T extends FieldValues>({
  form,
  name,
  title,
  placeholder,
}: Props<T>) {
  const [open, setOpen] = useState(false);

  const query = useCompaniesQuery();

  const { data: companies, status } = query;
  if (status === "error") {
    return (
      <ErrorContainer
        errorMessage="Failed to fetch companies"
        query={query}
        className="min-h-0"
      />
    );
  }
  if (status === "pending") {
    return (
      <div className="w-full space-y-3">
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }
  if (!companies.length) {
    return (
      <EmptyContainer
        title=""
        description="No companies found"
        className="[&_svg]:hidden space-y-0"
      >
        <ButtonAddEditCompany size={"sm"}>Add Company</ButtonAddEditCompany>
      </EmptyContainer>
    );
  }
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel required>{title || "Company"}</FormLabel>
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
                  {field.value ? (
                    <ChosenCompanyCommandItem
                      company={companies.find(
                        (company) => company.id === field.value.id,
                      )}
                    />
                  ) : (
                    "Choose company..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-fit  p-0">
              <Command>
                <CommandInput
                  placeholder={placeholder || "Search company..."}
                  className="h-9"
                />
                <CommandList>
                  <CommandEmpty className="space-y-3">
                    <span className="block">No such company found.</span>
                    <ButtonAddEditCompany>Add it</ButtonAddEditCompany>
                  </CommandEmpty>
                  <CommandGroup>
                    {companies.map((company) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      const { id, createdAt, updatedAt, ...shreddedCompany } =
                        company;
                      const value = (
                        Object.values(shreddedCompany).filter(
                          Boolean,
                        ) as string[]
                      ).join(", ");
                      return (
                        <CommandItem
                          key={company.id}
                          value={value}
                          onSelect={(currentValue) => {
                            console.log({ currentValue });
                            form.setValue(
                              name,
                              company as FieldPathValue<T, typeof name>,
                            );
                            form.clearErrors(name);
                            setOpen(false);
                          }}
                        >
                          <CommandItemCompany
                            company={company}
                            isChecked={field.value?.id === company.id}
                            className="p-0"
                          />
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
