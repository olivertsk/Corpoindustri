import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import {
  Combo,
  IComboProduct,
  IComboCreationAttributes,
} from '../types/combo';
import { Product } from '../types/product';

export type ComboFilters = {
  pag?: number;
  limit?: number;
  search?: string | null;
};

const toNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

/**
 * El backend devuelve los precios como string y cada producto del combo como el
 * producto completo con la cantidad en `ComboProduct.quantity`. Normalizamos a
 * la forma que consumen los componentes: precios numéricos y
 * `products: { productId, quantity, productDetail }`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalizeCombo = (raw: any): Combo => {
  if (!raw) return raw;

  const products: IComboProduct[] = Array.isArray(raw.products)
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      raw.products.map((item: any) => ({
        productId: item.id,
        quantity: item?.ComboProduct?.quantity ?? item?.quantity ?? 1,
        productDetail: item as Product,
      }))
    : [];

  return {
    ...raw,
    price: toNumber(raw.price),
    priceBs: raw.priceBs != null ? toNumber(raw.priceBs) : null,
    products,
  };
};

export const getCombos = async (
  params?: ComboFilters,
): Promise<{
  data: Combo[];
  meta: Meta;
}> => {
  try {
    const response = await makeGet('/combos/all', params);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const list: any[] = Array.isArray(response)
      ? response
      : response?.data || [];
    const meta: Meta = Array.isArray(response)
      ? { total: list.length, actualPage: 1, limit: params?.limit }
      : response?.meta || { total: list.length, actualPage: 1 };
    return {
      data: list.map(normalizeCombo),
      meta,
    };
  } catch (error) {
    throw error;
  }
};

export const getCombo = async (id: string): Promise<Combo> => {
  try {
    const response = await makeGet(`/combos/show/${id}`);
    return normalizeCombo(response);
  } catch (error) {
    throw error;
  }
};

export const getComboBySlug = async (slug: string): Promise<Combo> => {
  try {
    const response = await makeGet(`/combos/show-by-name/${slug}`);
    return normalizeCombo(response);
  } catch (error) {
    throw error;
  }
};

export const createCombo = async (data: IComboCreationAttributes) => {
  try {
    return await makePost('/combos/create', data);
  } catch (error) {
    throw error;
  }
};

export const updateCombo = async ({
  id,
  data,
}: {
  id: string;
  data: IComboCreationAttributes;
}) => {
  try {
    return await makePost(`/combos/update/${id}`, data, 'PUT');
  } catch (error) {
    throw error;
  }
};

export const deleteCombo = async (id: Combo['id']) => {
  try {
    return await makePost(`/combos/deleted/${id}`, {}, 'DELETE');
  } catch (error) {
    throw error;
  }
};
