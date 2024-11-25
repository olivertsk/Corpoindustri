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
