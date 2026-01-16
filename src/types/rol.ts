import { z } from 'zod';
import { IPermission, permissionSchema } from './permissionsTypes';

export const rolDictionary = {
  admin: 'Administrador',
  client: 'Cliente',
};

export const rolSchema = z.object({
  id: z.string(),
  name: z.string(),
  permissions: z.array(permissionSchema).optional(),
});
export type TRol = z.infer<typeof rolSchema>;

export interface IRolFilter {
  pag?: number;
  limit?: number;
  name?: string;
}

export type IRolPayloadForm = Pick<TRol, 'name'> & {
  id?: string;
  permissions?: IPermission[];
};

export interface AllRolResponse {
  data: TRol[];
  meta: {
    totalPage: number;
    total: number;
  };
}
