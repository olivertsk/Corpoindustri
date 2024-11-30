import { z } from 'zod';

export type IBannerFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  position?: EPositionBanner;
};

export enum EPositionBanner {
  HomePrincipal = 'homePrincipal',
  HomeSecondary = 'homeSecondary'
}

export const bannerSchema = z.object({
  id: z.string(),
  images: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  position: z.nativeEnum(EPositionBanner),
  alt: z.string()
});

export type IBanner = z.infer<typeof bannerSchema>;
