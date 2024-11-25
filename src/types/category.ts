import { z } from 'zod';

export type ICategoryFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  isSalient?: boolean;
};

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
