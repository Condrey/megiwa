import { CommodityMetadataSchema } from "@/lib/validation";

export const flattenCommodityMetadata = (
  commodityMetadata: CommodityMetadataSchema | null | undefined,
) =>
  !commodityMetadata
    ? ""
    : (Object.values(commodityMetadata).filter(Boolean) as string[]).join(", ");
