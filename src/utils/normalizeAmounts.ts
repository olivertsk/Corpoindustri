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

export const validateNormalizeAmount = (
  selectedCoin: Coin,
  product?: Product | OrderProduct,
  price?: number,
  priceType: 'price' | 'promoPrice' | 'any' = 'any'
): string => {
  if (selectedCoin.value === 'BS') {
    if (product) {
      const { priceWithTaxBs, promotionalPriceBs, priceBs } = product;
      switch (priceType) {
        case 'price':
          return normalizeAmountsBs(priceBs || 0);
        case 'promoPrice':
          return normalizeAmountsBs(promotionalPriceBs || 0);
        case 'any':
          return normalizeAmountsBs(
            priceWithTaxBs || promotionalPriceBs || priceBs
          );
        default:
          return '';
      }
    } else if (price !== undefined) {
      return normalizeAmountsBs(price);
    }
  } else {
    if (product) {
      const { priceWithTax, promotionalPrice, price } = product;
      switch (priceType) {
        case 'price':
          return normalizeAmounts(price || 0);
        case 'promoPrice':
          return normalizeAmounts(promotionalPrice || 0);
        case 'any':
          return normalizeAmounts(priceWithTax || promotionalPrice || price);
        default:
          return '';
      }
    } else if (price !== undefined) {
      return normalizeAmounts(price);
    }
  }
  return '';
};

export const amountByCoin = (
  selectedCoin: Coin,
  product: OrderProduct | Product
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
