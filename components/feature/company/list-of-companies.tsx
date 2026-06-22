"use client";

import { DataTable } from "@/components/data-table/data-table";
import { EmptyContainer } from "@/components/query-container/empty-container";
import ErrorContainer from "@/components/query-container/error-container";
import { CompanyData } from "@/lib/types";
import { PlusIcon } from "lucide-react";
import ButtonAddEditCompany from "./button-add-edit-company";
import { useCompaniesColumns } from "./columns";
import { useCompaniesWithInitialDataQuery } from "./query";

export default function ListOfCompanies({
  initialData,
}: {
  initialData: CompanyData[];
}) {
  const query = useCompaniesWithInitialDataQuery(initialData);

  const { data, isError } = query;
  if (isError)
    return (
      <ErrorContainer errorMessage="Failed to fetch companies" query={query} />
    );

  if (!data.length)
    return (
      <EmptyContainer
        title="No companies registered"
        description="Start by adding companies to the database"
      >
        <ButtonAddEditCompany variant={"secondary"}>
          Add Company{" "}
        </ButtonAddEditCompany>
      </EmptyContainer>
    );

  return (
    <DataTable
      data={data}
      columns={useCompaniesColumns}
      filterColumn={{ id: "name" }}
      className="w-full"
      tableHeaderSection={"Companies"}
    >
      <ButtonAddEditCompany variant={"secondary"} size={"icon-sm"}>
        <PlusIcon />
      </ButtonAddEditCompany>
    </DataTable>
  );
}
