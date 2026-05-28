import { z } from 'zod';
import { Department } from './department';

export type ICategoryFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  isSalient?: boolean | string;
  departmentId?: Department['id'];
  sort?: string;
  filters?: string;
};

export const categorySchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  description: z.string(),
  code: z.string(),
  status: z.boolean(),
  departmentId: z.string(),
  isSalient: z.boolean(),
  productCount: z.number().optional(),
});

export type ICategory = z.infer<typeof categorySchema>;
export type TCategoryForm = Pick<
  ICategory,
  | 'icon'
  | 'name'
  | 'description'
  | 'status'
  | 'departmentId'
  | 'isSalient'
  | 'code'
>;
