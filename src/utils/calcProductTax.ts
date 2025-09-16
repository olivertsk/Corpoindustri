import { Coin } from '../store/multicoinStore';
import { OrderProduct, Product } from '../types/product';
import { validateNormalizeAmount } from './normalizeAmounts';

export default function calcProductTax(
  product: Product | OrderProduct,
  taxRate: number | null = 0,
  selectedCoin: Coin
) {
  const price = product.promotionalPrice || product.price;
  const IVA = taxRate ? (price / 100) * taxRate : 0;

  return `${validateNormalizeAmount(
    selectedCoin,
    undefined,
    IVA
  )} (${taxRate}%)`;
}
