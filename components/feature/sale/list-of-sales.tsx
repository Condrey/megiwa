"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { SaleData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditSale from "./button-add-edit-sale";
import { useSalesColumns } from "./columns";
import { useSalesWithInitialDataQuery } from "./query";

export default function ListOfSales({
  initialData,
}: {
  initialData: SaleData[];
}) {
  const query = useSalesWithInitialDataQuery(initialData);

  const { data, isError } = query;
  if (isError)
    return (
      <ErrorContainer errorMessage="Failed to fetch sales" query={query} />
    );

  if (!data.length)
    return (
      <EmptyContainer
        title="No sales registered"
        description="Start by adding sales to the database"
      >
        <ButtonAddEditSale variant={"secondary"}>Add Sale </ButtonAddEditSale>
      </EmptyContainer>
    );

  return (
    <DataTable
      data={data}
      columns={useSalesColumns}
      filterColumn={{ id: "buyer_name", label: "buyer" }}
      tableHeaderSection={"Sales"}
      className="w-full"
    >
      <ButtonAddEditSale variant={"secondary"} size={"icon-sm"}>
        <PlusIcon />
      </ButtonAddEditSale>
    </DataTable>
  );
}
