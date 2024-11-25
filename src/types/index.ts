/** USER */

import { z } from 'zod';

export const userSchema = z.object({
  avatar: z.string().optional(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
  passwordConfirmation: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type TUser = Pick<User, 'email' | 'name' | 'avatar'>;
export type UserFormLogin = Pick<User, 'email' | 'password'>;
export type UserFormRegistration = Pick<
  User,
  'email' | 'password' | 'name' | 'passwordConfirmation' | 'avatar'
>;
export type ForgotPasswordForm = Pick<User, 'email'>;

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

/** CATEGORIES */
/** Filter in all */
export interface ICategoryFilter {
  pag?: number
  limit?: number
  name?: string
  isSalient?: boolean
}

export const categorySchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  departmentId: z.string(),
  isSalient: z.boolean(),
});

export type ICategory = z.infer<typeof categorySchema>;
