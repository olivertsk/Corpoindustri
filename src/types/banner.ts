import { z } from 'zod';

export type IBannerFilter = {
  pag?: number;
  limit?: number;
  name?: string;
  position?: EPositionBanner | string;
  isClient?: boolean;
};

export enum EPositionBanner {
  HomePrincipal = 'homePrincipal',
  HomeSecondary = 'homeSecondary',
  HomeTertiary = 'homeTertiary',
  Contact = 'Contact',
}

export const positionBanenrDictionary: Record<EPositionBanner, string> = {
  [EPositionBanner.HomePrincipal]: 'Principal',
  [EPositionBanner.HomeSecondary]: 'Secundario',
  [EPositionBanner.HomeTertiary]: 'Terciario',
  [EPositionBanner.Contact]: 'Contacto',
};

export const bannerSchema = z.object({
  id: z.string(),
  images: z.string(),
  mobileImage: z.string(),
  name: z.string(),
  description: z.string(),
  status: z.boolean(),
  position: z.nativeEnum(EPositionBanner),
});

export type IBanner = z.infer<typeof bannerSchema>;
export type IBannerCreate = Omit<IBanner, 'id' | 'alt'>;
