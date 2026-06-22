import { getAllCommodities } from "@/components/feature/commodity/action";
import ListOfCommodities from "@/components/feature/commodity/list-of-commodities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commodities",
};
export default async function Page() {
  const commodities = await getAllCommodities();

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfCommodities initialData={commodities} />
    </div>
  );
}
