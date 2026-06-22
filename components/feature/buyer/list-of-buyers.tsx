"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { BuyerData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditBuyer from "./button-add-edit-buyer";
import { useBuyersColumns } from "./columns";
import { useBuyersWithInitialDataQuery } from "./query";

export default function ListOfBuyers({
  initialData,
}: {
  initialData: BuyerData[];
}) {
  const query = useBuyersWithInitialDataQuery(initialData);

  const { data, isError } = query;
  if (isError)
    return (
      <ErrorContainer errorMessage="Failed to fetch buyers" query={query} />
    );

  if (!data.length)
    return (
      <EmptyContainer
        title="No buyers registered"
        description="Start by adding buyers to the database"
      >
        <ButtonAddEditBuyer variant={"secondary"}>
          Add Buyer{" "}
        </ButtonAddEditBuyer>
      </EmptyContainer>
    );

  return (
    <DataTable
      data={data}
      columns={useBuyersColumns}
      filterColumn={{ id: "name", label: "name" }}
      tableHeaderSection={"Buyers"}
      className="w-full"
    >
      <ButtonAddEditBuyer variant={"secondary"} size={"icon-sm"}>
        <PlusIcon />
      </ButtonAddEditBuyer>
    </DataTable>
  );
}
