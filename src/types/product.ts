import { z } from 'zod';

/** PRODUCTS */

export const productSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  code: z.string(),
  departmentId: z.string().nullable(),
  categoryId: z.string().nullable(),
  status: z.boolean().optional(),
  description: z.string().nullable(),
  longDescription: z.string().nullable(),
  price: z.number(),
  promotionalPrice: z.number().nullable(),
  stock: z.number(),
  brand: z.string().nullable(),
  taxRate: z.number().nullable(),
  coverImage: z.string().nullable(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export type Product = z.infer<typeof productSchema>;
