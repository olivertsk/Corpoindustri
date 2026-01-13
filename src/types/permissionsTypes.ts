import { GridRowsProp } from "@mui/x-data-grid";
import { z } from "zod";

export const viewSchema = z.object({
  id: z.string(),
  icon: z.string(),
  name: z.string(),
  route: z.string(),
  url: z.string(),
  order: z.number().optional().nullable(),
});

export type IView = z.infer<typeof viewSchema>;

export interface IResponseAllView {
  total?: number;
  totalPage?: number;
  data: IView[];
  actualPage?: number;
}

export interface IViewFilter {
  pag?: number;
  limit?: number;
  name?: string;
}

export type IViewPayloadForm = Pick<IView, "name" | "route" | "url"> & {
  id?: string;
  icon?: string | null;
  order?: number | null;
};

export interface AllViewResponse {
  data: IView[];
  meta: {
    totalPage: number;
    total: number;
  };
}

export type Meta = {
  total: number;
  totalPage: number;
  actualPage: number;
};

export type AllViewTable = {
  items: GridRowsProp;
  meta: Meta;
};

export const permissionSchema = z.object({
  id: z.string().optional().nullable(),
  rolId: z.string(),
  viewId: z.string(),
  post: z.boolean(),
  put: z.boolean(),
  delete: z.boolean(),
  view: viewSchema.optional().nullable()
});

export type IPermission = z.infer<typeof permissionSchema>;