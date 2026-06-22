import { CommodityMetadataSchema } from "@/lib/validation";

export const flattenCommodityMetadata = (
  commodityMetadata: CommodityMetadataSchema,
) => (Object.values(commodityMetadata).filter(Boolean) as string[]).join(", ");
