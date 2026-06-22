import { getAllSales } from "@/components/feature/sale/action";
import ListOfSales from "@/components/feature/sale/list-of-sales";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sales",
};
export default async function Page() {
  const sales = await getAllSales();

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfSales initialData={sales} />
    </div>
  );
}
