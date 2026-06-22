import { GoodQty } from "./generated/prisma/enums";

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
