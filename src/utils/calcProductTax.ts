import { OrderProduct, Product } from '../types/product';
import { normalizeAmounts } from './normalizeAmounts';

export default function calcProductTax(
  product: Product | OrderProduct,
  taxRate: number | null = 0
) {
  const price = product.promotionalPrice || product.price;
  const IVA = taxRate ? (price / 100) * taxRate : 0;

  return `${normalizeAmounts(IVA)} (${taxRate}%)`;
}
