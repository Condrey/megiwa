import { getAllOrders } from "@/components/feature/order/action";
import ListOfOrders from "@/components/feature/order/list-of-orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders",
};
export default async function Page() {
  const orders = await getAllOrders();

  return (
    <div className="mx-auto max-w-9xl">
      <ListOfOrders initialData={orders} />
    </div>
  );
}
