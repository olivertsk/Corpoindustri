export type Department = {
  id?: string;
  icon?: string | null;
  name: string;
  description?: string | null;
  status: boolean | true;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type TDepartmentForm = Pick<
  Department,
  'icon' | 'name' | 'description' | 'status'
>;

export type TDepartmenFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  isSalient?: boolean;
  product?: boolean;
};