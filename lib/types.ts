import { Prisma } from "./generated/prisma/client";

// Buyer
export const buyerDataInclude = {} satisfies Prisma.BuyerInclude;
export type BuyerData = Prisma.BuyerGetPayload<{
  include: typeof buyerDataInclude;
}>;

// Company
export const companyDataInclude = {} satisfies Prisma.CompanyInclude;
export type CompanyData = Prisma.CompanyGetPayload<{
  include: typeof companyDataInclude;
}>;

// Commodity
export const commodityDataInclude = {
  company: true,
  sellingPrices: true,
  orderItems: {
    select: {
      quantity: true,
      amount: true,
      goodQty: true,
      effectiveDateAt: true,
      otherGoodQty: true,
      currency: true,
    },
    orderBy: { effectiveDateAt: "desc" },
  },
  _count: {
    select: { orderItems: true, saleItems: true, sellingPrices: true },
  },
} satisfies Prisma.CommodityInclude;
export type CommodityData = Prisma.CommodityGetPayload<{
  include: typeof commodityDataInclude;
}>;

// Order
export const orderDataInclude = {
  company: true,
  orderedBy: true,
  orderItems: { include: { commodity: true } },
  _count: { select: { orderItems: true } },
} satisfies Prisma.OrderInclude;
export type OrderData = Prisma.OrderGetPayload<{
  include: typeof orderDataInclude;
}>;

// Sale
export const saleDataInclude = {
  buyer: true,
  soldBy: true,
  saleItems: { include: { commodity: true } },
  _count: { select: { saleItems: true } },
} satisfies Prisma.SaleInclude;
export type SaleData = Prisma.SaleGetPayload<{
  include: typeof saleDataInclude;
}>;
