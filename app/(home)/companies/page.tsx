import { getAllCompanies } from "@/components/feature/company/action";
import ListOfCompanies from "@/components/feature/company/list-of-companies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Companies",
};
export default async function Page() {
  const companies = await getAllCompanies();

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfCompanies initialData={companies} />
    </div>
  );
}
