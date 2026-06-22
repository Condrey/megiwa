import { z } from "zod";
import { GoodQty, SaleType } from "./generated/prisma/enums";
const requiredString = z.string().trim();

// organization
export const organizationSchema = z.object({
  id: z.string().optional().describe("Unique identifier(UUIDV4) for the buyer"),
  name: requiredString.min(1, { error: "Please enter a correct name" }),
  slug: requiredString.min(1, { error: "Organization Slug is required" }),
  logo: z.string().optional(),
  metadata: z.string().optional(),
  keepCurrentActiveOrganization: z.boolean(),
});
export type OrganizationSchema = z.infer<typeof organizationSchema>;

// sign up
export const signUpSchema = z
  .object({
    name: requiredString.min(1, { error: "Please enter your name" }),
    // contact: z.string().optional(),
    email: z.email().trim().min(1, { error: "Please enter a correct email" }),
    password: requiredString.min(1, { error: "Password is required " }),
    passwordConfirmation: requiredString.min(1, {
      error: "Please confirm password",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirmation) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords are not matching.",
        path: ["passwordConfirmation"],
      });
    }
  });
export type SignUpSchema = z.infer<typeof signUpSchema>;

// sign in
export const signInSchema = z.object({
  email: z.email().trim().min(1, { error: "Please enter a correct email" }),
  password: requiredString.min(1, { error: "Password is required " }),
  rememberMe: z.boolean(),
});
export type SignInSchema = z.infer<typeof signInSchema>;

// buyer
export const buyerSchema = z.object({
  id: z.string().optional().describe("Unique identifier(UUIDV4) for the buyer"),
  name: z.string().min(1, "Please enter a name").describe("Name of the buyer"),
  contact: requiredString
    .min(1, { error: "Please enter a contact" })
    .describe("Contact information for the buyer"),
  email: z.email().nullish().describe("Email address of the buyer"),
});
export type BuyerSchema = z.infer<typeof buyerSchema>;

// company
export const companySchema = z.object({
  id: z
    .string()
    .optional()
    .describe("Unique identifier(UUIDV4) for the company"),
  name: z.string().describe("Name of the company"),
  owner: z.string().optional().describe("Owner of the company"),
  location: z.string().optional().describe("Location of the company"),
  contact: z
    .string()
    .optional()
    .describe("Contact information for the company"),
  email: z.email().optional().describe("Email address of the company"),
});
export type CompanySchema = z.infer<typeof companySchema>;

// Commodity
export const commodityMetadataSchema = z.object({
  category: z.string().optional(),
  size: z.string().optional(),
  color: z.string().optional(),
  packaging: z.string().optional(),
  otherDescription: z.string().optional(),
});
export type CommodityMetadataSchema = z.infer<typeof commodityMetadataSchema>;

export const commoditySchema = z.object({
  id: z
    .string()
    .optional()
    .describe("Unique identifier(UUIDV4) for the commodity"),
  name: z.string().describe("Name of the commodity"),
  company: companySchema.optional(),
  commodityMetadata: commodityMetadataSchema.optional(),
});
export type CommoditySchema = z.infer<typeof commoditySchema>;

// order
export const orderItemSchema = z
  .object({
    id: z
      .string()
      .optional()
      .describe("Unique identifier(UUIDV4) for the order"),
    goodQty: z.enum(GoodQty, { error: "Please select a correct unit." }),
    otherGoodQty: z.string().optional(),
    quantity: z
      .number({ error: "Enter a correct quantity" })
      .min(1, { error: "Enter quantity >1" })
      .describe("Quantity of the commodity ordered"),
    amount: z
      .number({ error: "Enter a right amount" })
      .min(0)
      .describe("Price of the commodity"),
    currency: z.string(),
    commodity: commoditySchema,
  })
  .refine((data) => data.commodity !== undefined, {
    error: "Please choose or create a commodity",
    path: ["commodity"],
  });
export type OrderItemSchema = z.infer<typeof orderItemSchema>;

export const orderSchema = z
  .object({
    id: z
      .string()
      .optional()
      .describe("Unique identifier(UUIDV4) for the order"),
    orderedById: z.string().describe("ID of the user who placed the order"),
    totalAmount: z.number().describe("Total amount for the order"),
    orderItems: z.array(orderItemSchema).describe("List of items in the order"),
    company: companySchema,
  })
  .superRefine((data, ctx) => {
    if (!data.orderItems.length) {
      ctx.addIssue({
        code: "custom",
        message: "Enter at least one order item.",
        path: ["orderItems"],
      });
    }
  });
export type OrderSchema = z.infer<typeof orderSchema>;

// Sale
export const saleItemSchema = z
  .object({
    id: z
      .string()
      .optional()
      .describe("Unique identifier(UUIDV4) for the sale"),
    goodQty: z.enum(GoodQty, { error: "Please select a correct unit." }),
    otherGoodQty: z.string().optional(),
    quantity: z
      .number({ error: "Enter a correct quantity" })
      .min(1, { error: "Enter at least one quantity" })
      .describe("Quantity of the commodity sold"),
    amount: z
      .number({ error: "Enter a right amount" })
      .min(1)
      .describe("Price of the commodity"),
    unitPrice: z
      .number({ error: "Enter a right unit price" })
      .min(0)
      .describe("Price of the commodity"),
    currency: z.string(),
    commodity: commoditySchema,
    saleType: z.enum(SaleType, { error: "This is a wrong sale type" }),
  })
  .superRefine((data, ctx) => {
    if (data.commodity === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "Please choose or create a commodity",
        path: ["commodity"],
      });
    }
  });
export type SaleItemSchema = z.infer<typeof saleItemSchema>;

export const saleSchema = z
  .object({
    id: z
      .string()
      .optional()
      .describe("Unique identifier(UUIDV4) for the sale"),
    soldById: z.string().describe("ID of the seller"),
    buyerId: z.string().describe("ID of the buyer"),
    totalAmount: z.number().describe("Total amount for the sale"),
    saleItems: z.array(saleItemSchema).describe("List of items in the sale"),
  })
  .superRefine((data, ctx) => {
    if (!data.saleItems.length) {
      ctx.addIssue({
        code: "custom",
        message: "Enter at least one sale item.",
        path: ["saleItems"],
      });
    }
  });
export type SaleSchema = z.infer<typeof saleSchema>;

// Selling price
export const sellingPriceSchema = z
  .object({
    id: z
      .string()
      .optional()
      .describe("Unique identifier(UUIDV4) for the sellingPrice"),
    baseAmount: z
      .number({ error: "Enter correct retail price" })
      .describe("The retail price"),
    specialBaseAmount: z.number().nullish().describe("A special retail price"),
    wholesaleAmount: z
      .number({ error: "Enter correct wholesale price" })
      .describe("The wholesale price"),
    specialWholesaleAmount: z
      .number()
      .nullish()
      .describe("A special wholesale price"),
    promotionAmount: z.number().nullish().describe("The wholesale price"),
    currency: z.string().describe("The currency"),
    isCurrentPrice: z.boolean(),
    goodQty: z.enum(GoodQty, { error: "Please select a correct unit." }),
    commodityId: z.string().describe("The commodity being sold"),
    effectiveDateAt: z.date({ error: "Choose a correct date." }).optional(),
    otherGoodQty: z.string().nullish(),
  })
  .superRefine((data, ctx) => {
    if (
      data.specialBaseAmount &&
      data.specialBaseAmount <= data.wholesaleAmount
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "Special retail price can not be lower than or equal to wholesale price",
        path: ["specialBaseAmount"],
      });
    }

    if (data.goodQty === GoodQty.OTHER && data.otherGoodQty === undefined) {
      ctx.addIssue({
        code: "custom",
        message: "Define the selected other unit quantity",
        path: ["otherGoodQty"],
      });
    }
  });
export type SellingPriceSchema = z.infer<typeof sellingPriceSchema>;
