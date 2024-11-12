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
export type ForgotPasswordForm = Pick<User, 'email'>;

/** PRODUCTS */

export const productSchema = z.object({
  name: z.string(),
  image: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof productSchema>;
