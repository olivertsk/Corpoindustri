/** USER */

import { z } from 'zod';

export const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  passwordConfirmation: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserFormLogin = Pick<User, 'email' | 'password'>;
export type UserFormRegistration = Pick<
  User,
  'email' | 'password' | 'name' | 'passwordConfirmation'
>;

/** PRODUCTS */

export const productSchema = z.object({
  name: z.string(),
});

export type Product = z.infer<typeof productSchema>;
