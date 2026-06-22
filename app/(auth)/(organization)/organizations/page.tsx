import { getAllOrganizations } from "@/components/feature/organization/action";
import ButtonAddEditOrganization from "@/components/feature/organization/button-add-edit-organization";
import ListOfOrganizations from "@/components/feature/organization/list-of-organizations";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Organizations",
};
export default async function Page() {
  const organizations = await getAllOrganizations();
  return (
    <main className="flex flex-col px-4 mx-auto max-w-9xl space-y-6">
      <div className="flex items-center gap-3">
        <h3>Organizations</h3>
        <ButtonAddEditOrganization size={"icon-lg"} variant={"outline"}>
          <PlusIcon />
        </ButtonAddEditOrganization>
      </div>
      <div className="flex  justify-center items-center flex-col px-4 ">
        <ListOfOrganizations initialData={organizations} />
      </div>
    </main>
  );
}
