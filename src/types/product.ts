import { z } from 'zod';

/** PRODUCTS */

export const productSchema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
});

export type Product = {
  id?: string;
  name: string;
  code: string;
  departmentId?: string | null;
  categoryId?: string | null;
  status?: boolean;
  description?: string | null;
  longDescription?: string | null;
  price: number;
  promotionalPrice?: number | null;
  stock: number;
  brand?: string | null;
  taxRate?: number | null;
  coverImage?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
};
