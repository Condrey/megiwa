import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommodityData } from "@/lib/types";
import { CompanySchema } from "@/lib/validation";
import { Edit2Icon, MoveUpRightIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import FormAddEditSellingPrice from "../sellingPrice/form-add-edit-sellingPrice";
import FormAddEditCommodity from "./form-add-edit-commodity";

interface Props extends ButtonProps {
  commodity: CommodityData;
}

export default function DropDownMenuCommodity({
  commodity,
  children,
  ...props
}: Props) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openSellingPriceForm, setOpenSellingPriceForm] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button {...props} title="show more">
            <span className="sr-only">Show more</span>
            {children}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <MoveUpRightIcon /> View commodity
            </DropdownMenuItem>
            <DropdownMenuItem role="button" onClick={() => setOpenEdit(true)}>
              <Edit2Icon /> Update commodity
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Secondary actions</DropdownMenuLabel>
            <DropdownMenuItem
              role="button"
              onClick={() => setOpenSellingPriceForm(true)}
            >
              <PlusIcon /> Add selling price
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive">
              <Trash2Icon /> Delete commodity
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <FormAddEditCommodity
        open={openEdit}
        setOpen={setOpenEdit}
        commodity={commodity}
        company={commodity.company as CompanySchema}
      />
      <FormAddEditSellingPrice
        open={openSellingPriceForm}
        setOpen={setOpenSellingPriceForm}
        commodity={commodity}
      />
    </>
  );
}
