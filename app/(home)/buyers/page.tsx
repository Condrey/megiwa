import { getAllBuyers } from "@/components/feature/buyer/action";
import ListOfBuyers from "@/components/feature/buyer/list-of-buyers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buyers",
};
export default async function Page() {
  const buyers = await getAllBuyers();

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfBuyers initialData={buyers} />
    </div>
  );
}
