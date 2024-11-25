export type Department = {
  id?: string;
  icon?: string | null;
  name: string;
  description?: string | null;
  status: boolean;
  isSalient: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TDepartmentForm = Pick<
  Department,
  'icon' | 'name' | 'description' | 'status' | 'isSalient'
>;

export type DepartmentFilters = {
  pag?: number;
  limit?: number;
  name?: string | null;
  isSalient: boolean | null | string;
  product?: boolean;
};