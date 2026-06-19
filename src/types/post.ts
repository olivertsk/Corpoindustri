import { z } from 'zod';
import { Product } from './product';

export const postTypeSchema = z.enum(['article', 'recipe']);

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  excerpt: z.string().nullable(),
  coverImage: z.string().nullable(),
  type: postTypeSchema,
  metaTitle: z.string().nullable(),
  metaDescription: z.string().nullable(),
  status: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  products: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    )
    .optional(),
});

export type PostType = z.infer<typeof postTypeSchema>;
export type TPost = z.infer<typeof postSchema>;

export type TPostFilters = {
  pag?: number;
  limit?: number;
  title?: string;
  type?: PostType | '';
  filters?: string;
};

export type TPostForm = {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  type: PostType;
  metaTitle?: string;
  metaDescription?: string;
  status: boolean;
  productIds?: Product['id'][];
};
