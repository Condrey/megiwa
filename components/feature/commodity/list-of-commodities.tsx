"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { CommodityData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditCommodity from "./button-add-edit-commodity";
import { useCommoditiesColumns } from "./columns";
import { useCommoditiesWithInitialDataQuery } from "./query";

export default function ListOfCommodities({
  initialData,
}: {
  initialData: CommodityData[];
}) {
  const query = useCommoditiesWithInitialDataQuery(initialData);

  const { data, isError } = query;
  if (isError)
    return (
      <ErrorContainer
        errorMessage="Failed to fetch commodities"
        query={query}
      />
    );

  if (!data.length)
    return (
      <EmptyContainer
        title="No commodities registered"
        description="Start by adding commodities to the database"
      >
        <ButtonAddEditCommodity variant={"secondary"}>
          Add Commodity{" "}
        </ButtonAddEditCommodity>
      </EmptyContainer>
    );

  return (
    <DataTable
      data={data}
      columns={useCommoditiesColumns}
      filterColumn={{ id: "name" }}
      tableHeaderSection={"Commodities"}
      className="w-full"
    >
      <ButtonAddEditCommodity variant={"secondary"} size={"icon-sm"}>
        <PlusIcon />
      </ButtonAddEditCommodity>
    </DataTable>
  );
}
