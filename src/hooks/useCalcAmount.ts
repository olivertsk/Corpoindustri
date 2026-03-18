'use client';

import { useCallback } from 'react';
import { useMultiCoinStore } from '../store/multicoinStore';
import { OrderProduct, Product } from '../types/product';
import {
  normalizeAmounts,
  normalizeAmountsBs,
} from '../utils/normalizeAmounts';

export const useCalcAmount = () => {
  const { selectedCoin, currencies } = useMultiCoinStore((state) => state);

  const calcAmount = useCallback(
    (amount: number) => {
      if (selectedCoin.value === 'BS') {
        return amount * (currencies[0]?.exchangeRate || 1);
      }
      return amount;
    },
    [selectedCoin, currencies],
  );

  const choosePrice = useCallback(
    (item: Product | OrderProduct, makeCalc?: boolean) => {
      return selectedCoin.value === 'USD'
        ? item.priceWithTaxBs || item.promotionalPriceBs || item.priceBs // This line means the price in dollars for BS,
        : makeCalc
          ? calcAmount(
              item.priceWithTaxBs || item.promotionalPriceBs || item.priceBs,
            )
          : item.priceWithTaxBs || item.promotionalPriceBs || item.priceBs;
    },
    [selectedCoin, calcAmount],
  );

  const validateNormalizeAmount = useCallback(
    (
      product?: Product | OrderProduct,
      price?: number,
      priceType: 'price' | 'promoPrice' | 'any' = 'any',
    ): string => {
      if (selectedCoin.value === 'BS') {
        if (product) {
          const { priceWithTaxBs, promotionalPriceBs, priceBs } = product;
          switch (priceType) {
            case 'price':
              return normalizeAmountsBs(calcAmount(priceBs || 0));
            case 'promoPrice':
              return normalizeAmountsBs(calcAmount(promotionalPriceBs || 0));
            case 'any':
              return normalizeAmountsBs(
                calcAmount(priceWithTaxBs || promotionalPriceBs || priceBs),
              );
            default:
              return '';
          }
        } else if (price !== undefined) {
          return normalizeAmountsBs(calcAmount(price));
        }
      } else {
        if (product) {
          const { priceWithTaxBs, promotionalPriceBs, priceBs } = product;
          switch (priceType) {
            case 'price':
              return normalizeAmounts(priceBs || 0);
            case 'promoPrice':
              return normalizeAmounts(promotionalPriceBs || 0);
            case 'any':
              return normalizeAmounts(
                priceWithTaxBs || promotionalPriceBs || priceBs,
              );
            default:
              return '';
          }
        } else if (price !== undefined) {
          return normalizeAmounts(price);
        }
      }
      return '';
    },
    [selectedCoin, calcAmount],
  );

  const calcProductTax = useCallback(
    (product: Product | OrderProduct, taxRate: number | null = 0) => {
      const price = product.promotionalPriceBs || product.priceBs;
      const IVA = taxRate ? (price / 100) * taxRate : 0;

      return `${validateNormalizeAmount(undefined, IVA)} (${taxRate}%)`;
    },
    [validateNormalizeAmount],
  );

  return {
    choosePrice,
    validateNormalizeAmount,
    calcProductTax,
    calcAmount,
    currentCoin: selectedCoin,
  };
};
