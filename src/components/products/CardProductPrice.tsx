'use client';

import { useMultiCoinStore } from '@/src/store/multicoinStore';
import { Product } from '@/src/types/product';
import calcProductTax from '@/src/utils/calcProductTax';
import { validateNormalizeAmount } from '@/src/utils/normalizeAmounts';

type CardProductPriceProps = {
  product: Product;
};

export default function CardProductPrice({ product }: CardProductPriceProps) {
  const selectedCoin = useMultiCoinStore((state) => state.selectedCoin);

  const hasPromotionalPrice = !!(selectedCoin.value === 'BS'
    ? product.promotionalPriceBs
    : product.promotionalPrice);

  const productPrice =
    selectedCoin.value === 'BS' ? product.priceBs : product.price;
  const productPromotionalPrice =
    selectedCoin.value === 'BS'
      ? product.promotionalPriceBs
      : product.promotionalPrice;

  const totalRef =
    selectedCoin.value === 'BS'
      ? product.priceWithTaxBs || product.promotionalPriceBs || product.priceBs
      : product.priceWithTax || product.promotionalPrice || product.price;

  return (
    <>
      {productPrice || productPromotionalPrice || totalRef ? (
        <div className='flex px-4 justify-between h-[80px] mt-1'>
          <div>
            <p
              className={`text-sm  text-slate-500 flex-1 overflow-hidden text-ellipsis ${
                hasPromotionalPrice && 'line-through text-slate-400 text-sm'
              }`}
            >
              Ref.{' '}
              {validateNormalizeAmount(selectedCoin, undefined, productPrice)}
            </p>
            {hasPromotionalPrice ? (
              <p className='text-sm  text-slate-600 flex-1 overflow-hidden text-ellipsis w-full'>
                Ref Promo.{' '}
                {validateNormalizeAmount(
                  selectedCoin,
                  undefined,
                  productPromotionalPrice || 0
                )}
              </p>
            ) : (
              ''
            )}
            {product.taxRate != null && product.taxRate > 0 && (
              <p className='text-sm text-slate-600'>
                IVA Ref.{' '}
                {calcProductTax(product, product.taxRate, selectedCoin)}
              </p>
            )}
            <p className='text-sm font-bold'>
              Total Ref.{' '}
              {validateNormalizeAmount(selectedCoin, undefined, totalRef)}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className='text-sm font-bold text-slate-600 p-4'>
            Este producto no esta disponible en {selectedCoin.value}
          </p>
        </div>
      )}
    </>
  );
}
