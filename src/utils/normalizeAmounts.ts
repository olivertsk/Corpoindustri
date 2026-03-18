import { Coin } from '../store/multicoinStore';
import { OrderProduct, Product } from '../types/product';

export const normalizeAmounts = (amount: number) => {
  return Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const normalizeAmountsBs = (amount: number) => {
  return Intl.NumberFormat('es-VE', {
    style: 'currency',
    currency: 'VES',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const amountByCoin = (
  selectedCoin: Coin,
  product: OrderProduct | Product,
) => {
  if (selectedCoin.value === 'BS') {
    return (
      product.priceWithTaxBs ||
      product.promotionalPriceBs ||
      product.priceBs ||
      0
    );
  } else {
    return (
      product.priceWithTax || product.promotionalPrice || product.price || 0
    );
  }
};
