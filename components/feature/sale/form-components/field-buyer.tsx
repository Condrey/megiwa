import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { SaleSchema } from "@/lib/validation";
import { ChevronsUpDownIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { EmptyContainer } from "../../../query-container/empty-container";
import ErrorContainer from "../../../query-container/error-container";
import ButtonAddEditBuyer from "../../buyer/button-add-edit-buyer";
import {
  ChosenBuyerCommandItem,
  CommandItemBuyer,
} from "../../buyer/chosen-buyer-command-item";
import { useBuyersQuery } from "../../buyer/query";

interface Props {
  form: UseFormReturn<SaleSchema>;
}

export default function FieldBuyer({ form }: Props) {
  const [open, setOpen] = useState(false);

  const query = useBuyersQuery();

  const { data: buyers, status } = query;
  if (status === "error") {
    return (
      <ErrorContainer
        errorMessage="Failed to fetch buyers"
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
  if (!buyers.length) {
    return (
      <EmptyContainer
        title=""
        description="No buyers found"
        className="[&_svg]:hidden space-y-0"
      >
        <ButtonAddEditBuyer size={"sm"}>Add Buyer</ButtonAddEditBuyer>
      </EmptyContainer>
    );
  }
  return (
    <FormField
      control={form.control}
      name="buyerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel required>Buyer</FormLabel>
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
                    <ChosenBuyerCommandItem
                      buyer={buyers.find((buyer) => buyer.id === field.value)}
                    />
                  ) : (
                    "Choose buyer..."
                  )}
                  <ChevronsUpDownIcon className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-fit  p-0">
              <Command>
                <CommandInput placeholder="Search buyer..." className="h-9" />
                <CommandList>
                  <CommandEmpty className="space-y-3">
                    <span className="block">No buyer found.</span>
                    <ButtonAddEditBuyer>Add buyer</ButtonAddEditBuyer>
                  </CommandEmpty>
                  <CommandGroup>
                    {buyers.map((buyer) => (
                      <CommandItem
                        key={buyer.id}
                        value={buyer.name}
                        onSelect={(currentValue) => {
                          console.log({ currentValue });
                          form.setValue("buyerId", buyer.id);
                          form.clearErrors("buyerId");
                          setOpen(false);
                        }}
                      >
                        <CommandItemBuyer
                          buyer={buyer}
                          isChecked={field.value === buyer.id}
                          className="p-0"
                        />
                      </CommandItem>
                    ))}
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
