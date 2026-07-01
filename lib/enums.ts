import { GoodQty, SaleType } from "./generated/prisma/enums";

// role
export const allGoodQuantities = Object.values(GoodQty);
export const goodQuantities: Record<
  GoodQty,
  { plural: string; singular: string }
> = {
  BOX: {
    plural: "boxes",
    singular: "box",
  },
  PIECE: {
    plural: "pieces",
    singular: "piece",
  },
  PACKET: {
    plural: "pkts",
    singular: "pkt",
  },
  ROLL: {
    plural: "rolls",
    singular: "roll",
  },
  SACHET: {
    plural: "sachets",
    singular: "sachet",
  },
  SAC: {
    plural: "sacs",
    singular: "sac",
  },
  BUNDLE: {
    plural: "bundles",
    singular: "bundle",
  },
  PAIR: {
    plural: "pairs",
    singular: "pair",
  },
  LITRES: {
    plural: "ltrs",
    singular: "ltr",
  },
  JERRICAN: {
    plural: "jerricans",
    singular: "jerrican",
  },
  CARTOON: {
    plural: "ctns",
    singular: "ctn",
  },
  OTHER: {
    plural: "other",
    singular: "other",
  },
};

export const allSaleTypes = Object.values(SaleType);
export const saleTypes: Record<
  SaleType,
  { title: string; abbreviation: string }
> = {
  WHOLESALE: {
    title: "Wholesale",
    abbreviation: "Wholesale",
  },
  SPECIAL_WHOLESALE: {
    title: "Special Wholesale",
    abbreviation: "Sp.Wholesale",
  },
  BASE: {
    title: "Retail",
    abbreviation: "Retail",
  },
  SPECIAL_BASE: {
    title: "Special Retail",
    abbreviation: "Sp.Retail",
  },
  PROMOTION: {
    title: "Promotions",
    abbreviation: "Promotion",
  },
};
