'use client';

import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { Product } from '@/src/types/product';

type CardProductPriceProps = {
  product: Product;
};

export default function CardProductPrice({ product }: CardProductPriceProps) {
  const { choosePrice, validateNormalizeAmount, calcProductTax, currentCoin } =
    useCalcAmount();

  const hasPromotionalPrice = !!product.promotionalPriceBs;

  const productPrice = product.priceBs;
  const productPromotionalPrice = product.promotionalPriceBs;

  const totalRef = choosePrice(product);

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
              Ref. {validateNormalizeAmount(undefined, productPrice)}
            </p>
            {hasPromotionalPrice ? (
              <p className='text-sm  text-slate-600 flex-1 overflow-hidden text-ellipsis w-full'>
                Ref Promo.{' '}
                {validateNormalizeAmount(
                  undefined,
                  productPromotionalPrice || 0,
                )}
              </p>
            ) : (
              ''
            )}
            {product.taxRate != null && product.taxRate > 0 && (
              <p className='text-sm text-slate-600'>
                IVA Ref. {calcProductTax(product, product.taxRate)}
              </p>
            )}
            <p className='text-sm font-bold'>
              Total Ref. {validateNormalizeAmount(product, undefined)}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <p className='text-sm font-bold text-slate-600 p-4'>
            Este producto no esta disponible en {currentCoin.value}
          </p>
        </div>
      )}
    </>
  );
}
