import { z } from 'zod';

export const departmentSchema = z.object({
  icon: z.string(),
  id: z.string(),
  isSalient: z.boolean(),
  name: z.string(),
  status: z.boolean(),
});

export const categorySchema = z.object({
  icon: z.string(),
  id: z.string(),
  isSalient: z.boolean(),
  name: z.string(),
  status: z.boolean(),
});

/** PRODUCTS */

export const productSchema = z.object({
  id: z.string().optional(),
  departmentId: z.string().nullable(),
  categoryId: z.string().nullable(),
  description: z.string().nullable(),
  name: z.string(),
  code: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      alt: z.string(),
      isVideo: z.boolean(),
      file: z.string(),
      productId: z.string(),
      position: z.number(),
    }),
  ),
  status: z.boolean().optional(),
  longDescription: z.string().nullable(),
  price: z.number(),
  promotionalPrice: z.number().nullable(),
  priceWithTax: z.number().nullable(),
  priceBs: z.number(),
  promotionalPriceBs: z.number().nullable(),
  priceWithTaxBs: z.number().nullable(),
  department: departmentSchema.optional(),
  category: categorySchema.optional(),
  stock: z.number(),
  brand: z.string().nullable(),
  taxRate: z.number().nullable(),
  coverImage: z.string().nullable(),
  favorite: z
    .object({
      id: z.string(),
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export const productDetailSchema = productSchema.extend({
  relations: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductDetail = z.infer<typeof productDetailSchema> & {
  totalReviews: number;
  avgRating: number;
  totalComments: number;
};
export type TProductForm = Pick<
  Product,
  | 'departmentId'
  | 'categoryId'
  | 'description'
  | 'name'
  | 'code'
  | 'price'
  | 'promotionalPrice'
  | 'priceWithTax'
  | 'longDescription'
  | 'taxRate'
  | 'brand'
  | 'stock'
  | 'status'
  | 'coverImage'
  | 'priceBs'
  | 'promotionalPriceBs'
  | 'priceWithTaxBs'
> & {
  images?: Array<
    Pick<Product['images'][0], 'alt' | 'file' | 'isVideo' | 'position'>
  >;
};
export type OrderProduct = Pick<
  Product,
  | 'id'
  | 'name'
  | 'price'
  | 'priceWithTax'
  | 'promotionalPrice'
  | 'priceWithTaxBs'
  | 'priceBs'
  | 'promotionalPriceBs'
  | 'coverImage'
  | 'taxRate'
  | 'code'
> & {
  quantity: number;
  subtotal: number;
};
