"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { OrderData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditOrder from "./button-add-edit-order";
import { useOrdersColumns } from "./columns";
import { useOrdersWithInitialDataQuery } from "./query";

export default function ListOfOrders({
  initialData,
}: {
  initialData: OrderData[];
}) {
  const query = useOrdersWithInitialDataQuery(initialData);

  const { data, isError } = query;
  if (isError)
    return (
      <ErrorContainer errorMessage="Failed to fetch orders" query={query} />
    );

  if (!data.length)
    return (
      <EmptyContainer
        title="No orders registered"
        description="Start by adding orders to the database"
      >
        <ButtonAddEditOrder variant={"secondary"}>
          Add Order{" "}
        </ButtonAddEditOrder>
      </EmptyContainer>
    );

  return (
    <DataTable
      data={data}
      columns={useOrdersColumns}
      filterColumn={{ id: "company_name", label: "company" }}
      tableHeaderSection={"Orders"}
      className="w-full"
    >
      <ButtonAddEditOrder variant={"secondary"} size={"icon-sm"}>
        <PlusIcon />
      </ButtonAddEditOrder>
    </DataTable>
  );
}
