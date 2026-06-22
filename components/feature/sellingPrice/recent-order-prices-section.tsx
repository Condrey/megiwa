import { EmptyContainer } from "@/components/query-container/empty-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { goodQuantities } from "@/lib/enums";
import { CommodityData } from "@/lib/types";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { CommodityMetadataSchema } from "@/lib/validation";
import { formatDate } from "date-fns";
import { ShapesIcon } from "lucide-react";
import { flattenCommodityMetadata } from "../commodity/utils";

interface Props {
  commodity: CommodityData;
  className?: string;
}
export default function RecentOrderPricesSection({
  commodity,
  className,
}: Props) {
  const {
    commodityMetadata,
    name,
    company: { name: companyName },
    orderItems,
  } = commodity;

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="uppercase text-xl tracking-tight">
          Recent order item prices
        </CardTitle>
        <CardTitle>{companyName}</CardTitle>
        <CardTitle>
          {name}{" "}
          {flattenCommodityMetadata(
            commodityMetadata as CommodityMetadataSchema,
          )}
        </CardTitle>
        <CardDescription>
          This is to help you determine the selling price
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!orderItems.length ? (
          <EmptyContainer
            title="No previous orders"
            description="There are no previous orders made for this commodity"
            icon={ShapesIcon}
          />
        ) : (
          <div className="divide-x divide-y divide-muted-foreground gap-2 flex flex-col ">
            {orderItems.map((item, index) => {
              const {
                amount,
                currency,
                effectiveDateAt,
                goodQty,
                otherGoodQty,
                quantity,
              } = item;
              const { plural, singular } = goodQuantities[goodQty];
              const unit = (otherGoodQty ?? quantity === 1) ? singular : plural;

              return (
                <Item key={index} variant={"outline"}>
                  <ItemHeader>
                    <ItemTitle className="text-muted-foreground">
                      {"Ordered "}
                      {formatNumber(quantity)}
                      {unit}
                      {" at "}
                      {formatCurrency(amount, currency)}
                    </ItemTitle>
                    <ItemDescription>
                      {formatDate(effectiveDateAt, "PPP")}
                    </ItemDescription>
                  </ItemHeader>
                  <ItemContent>
                    <span>
                      Bought at {formatCurrency(amount / quantity)} per{" "}
                      {otherGoodQty ?? singular}{" "}
                    </span>
                  </ItemContent>
                </Item>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
