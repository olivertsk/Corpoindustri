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
  price: z.number(),
  images: z.array(
    z.object({
      id: z.string(),
      alt: z.string(),
      isVideo: z.boolean(),
      file: z.string(),
      productId: z.string(),
      position: z.number(),
    })
  ),
  status: z.boolean().optional(),
  longDescription: z.string().nullable(),
  promotionalPrice: z.number().nullable(),
  department: departmentSchema.optional(),
  category: categorySchema.optional(),
  stock: z.number(),
  brand: z.string().nullable(),
  taxRate: z.number().nullable(),
  coverImage: z.string().nullable(),
  isFavorite: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
export type TProductForm = Pick<
  Product,
  | 'departmentId'
  | 'categoryId'
  | 'description'
  | 'name'
  | 'code'
  | 'price'
  | 'longDescription'
  | 'taxRate'
  | 'brand'
  | 'stock'
  | 'promotionalPrice'
  | 'status'
> & {
  images: Array<
    Pick<Product['images'][0], 'alt' | 'file' | 'isVideo' | 'position'>
  >;
};
