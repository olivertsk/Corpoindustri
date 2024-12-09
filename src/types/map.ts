import { z } from 'zod';

export type TMapFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  isClient?: boolean;
};

export const mapSchema = z.object({
  id: z.string(),
  image: z.string(),
  name: z.string(),
  description: z.string(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  map: z.string(),
  order: z.number(),
  status: z.boolean(),
});

export type TMap = z.infer<typeof mapSchema>;
export type TMapCreate = Omit<TMap, 'id'>;
