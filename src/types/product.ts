import { z } from 'zod';
import type { Meta } from '.';
import type { TUser, User } from './user';

export const departmentSchema = z.object({
  icon: z.string(),
  id: z.string(),
  isSalient: z.boolean(),
  name: z.string(),
  status: z.boolean(),
});

export const categorySchema = z.object({
  icon: z.string(),
  id: z.string(),
  isSalient: z.boolean(),
  name: z.string(),
  status: z.boolean(),
});

/** PRODUCTS */

export const productSchema = z.object({
  id: z.string().optional(),
  departmentId: z.string().nullable(),
  categoryId: z.string().nullable(),
  description: z.string().nullable(),
  name: z.string(),
  code: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      alt: z.string(),
      isVideo: z.boolean(),
      file: z.string(),
      productId: z.string(),
      position: z.number(),
    }),
  ),
  status: z.boolean().optional(),
  longDescription: z.string().nullable(),
  price: z.number(),
  promotionalPrice: z.number().nullable(),
  priceWithTax: z.number().nullable(),
  priceBs: z.number(),
  promotionalPriceBs: z.number().nullable(),
  priceWithTaxBs: z.number().nullable(),
  avgRating: z.string().optional(),
  department: departmentSchema.optional(),
  category: categorySchema.optional(),
  stock: z.number(),
  brand: z.string().nullable(),
  unit: z.string().nullable(),
  model: z.string().nullable(),
  taxRate: z.number().nullable(),
  coverImage: z.string().nullable(),
  favorite: z
    .object({
      id: z.string(),
    })
    .optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  deletedAt: z.string().optional(),
});

export const productDetailSchema = productSchema.extend({
  relations: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type IProductAttributes = Product;
export type IUserAttributes = User;

export interface IProductReviewAttributes {
  id?: string;
  productId?: IProductAttributes['id'];
  userId?: IUserAttributes['id'];
  rating: number;
  comment?: string;
  isApproved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductCommentAttributes {
  id?: string;
  productId?: IProductAttributes['id'];
  author?: Pick<TUser, 'name' | 'id'>;
  userId?: IUserAttributes['id'];
  parentId?: string | null;
  content: string;
  isApproved?: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  replies?: IProductCommentAttributes[];
}

export interface IProductReviewDetail {
  data: IProductReviewAttributes[];
  meta: Meta;
}

export interface IProductCommentDetail {
  data: IProductCommentAttributes[];
  meta: Meta;
}

export interface IProductSuggestion {
  id: string;
  name: string;
}

export type ProductDetail = z.infer<typeof productDetailSchema> & {
  totalReviews: number;
  avgRating: number;
  totalComments: number;
};
export type TProductForm = Pick<
  Product,
  | 'departmentId'
  | 'categoryId'
  | 'description'
  | 'name'
  | 'code'
  | 'price'
  | 'promotionalPrice'
  | 'priceWithTax'
  | 'longDescription'
  | 'taxRate'
  | 'brand'
  | 'stock'
  | 'status'
  | 'coverImage'
  | 'priceBs'
  | 'promotionalPriceBs'
  | 'priceWithTaxBs'
  | 'unit'
  | 'model'
> & {
  images?: Array<
    Pick<Product['images'][0], 'alt' | 'file' | 'isVideo' | 'position'>
  >;
};
export type OrderProduct = Pick<
  Product,
  | 'id'
  | 'name'
  | 'price'
  | 'priceWithTax'
  | 'promotionalPrice'
  | 'priceWithTaxBs'
  | 'priceBs'
  | 'promotionalPriceBs'
  | 'coverImage'
  | 'taxRate'
  | 'code'
> & {
  quantity: number;
  subtotal: number;
};
