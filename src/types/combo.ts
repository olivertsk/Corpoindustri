import { z } from 'zod';
import type { Meta } from '.';
import { productSchema, type Product } from './product';

/** COMBOS */

/**
 * Forma NORMALIZADA (la produce `normalizeCombo` en ComboApi.ts a partir de la
 * respuesta cruda del backend, donde cada producto viene completo con la
 * cantidad en `ComboProduct.quantity`).
 */
export const comboProductSchema = z.object({
  id: z.string().optional(),
  comboId: z.string().optional(),
  productId: z.string(),
  quantity: z.number(),
  /** Producto completo: trae los precios necesarios para agregar al carrito */
  productDetail: productSchema.optional(),
});

export const comboSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable().optional(),
  price: z.number(),
  priceBs: z.number().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  status: z.boolean().optional(),
  products: z.array(comboProductSchema).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type Combo = z.infer<typeof comboSchema>;
export type IComboProduct = z.infer<typeof comboProductSchema>;

export interface IComboProductAttributes {
  id?: string;
  /** Opcional en creación: el backend lo asigna al crear el combo */
  comboId?: string;
  productId: string;
  quantity: number;
  productDetail?: Product;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IComboAttributes {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  priceBs?: number | null;
  coverImage?: string | null;
  status?: boolean;
  products?: IComboProductAttributes[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

/** Payload que se envía al endpoint de creación (y actualización) */
export type IComboCreationAttributes = Pick<IComboAttributes, 'id'> & {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  priceBs?: number | null;
  coverImage?: string | null;
  status?: boolean;
  products?: IComboProductAttributes[];
};

export interface IComboDetail {
  data: Combo[];
  meta: Meta;
}

/** Item de producto dentro del formulario (UI + recálculo de precio) */
export type TComboFormProduct = {
  productId: string;
  quantity: number;
  productDetail?: Product;
};

export type TComboForm = {
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  priceBs?: number | null;
  coverImage?: string | null;
  status?: boolean;
  products: TComboFormProduct[];
};
