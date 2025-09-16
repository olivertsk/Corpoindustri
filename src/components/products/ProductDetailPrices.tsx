'use client';
import { useMultiCoinStore } from '@/src/store/multicoinStore';
import { Product } from '@/src/types/product';
import calcProductTax from '@/src/utils/calcProductTax';
import { validateNormalizeAmount } from '@/src/utils/normalizeAmounts';
import React from 'react';
import AddProductToOrder from './AddProductToOrder';

type ProductDetailPricesProps = {
  product: Product;
};

export default function ProductDetailPrices({
  product,
}: ProductDetailPricesProps) {
  const selectedCoin = useMultiCoinStore((state) => state.selectedCoin);

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

  console.log('selectedCoin', selectedCoin);
  return (
    <>
      {productPrice || productPromotionalPrice || totalRef ? (
        <>
          <div className='space-y-1'>
            <h5
              className={`text-xl  ${
                productPromotionalPrice &&
                productPromotionalPrice > 0 &&
                'line-through text-slate-400 text-xl'
              }`}
            >
              Ref.{' '}
              {validateNormalizeAmount(
                selectedCoin,
                product,
                undefined,
                'price'
              )}
            </h5>
            {product.promotionalPrice !== null &&
              product.promotionalPrice > 0 && (
                <h5 className='text-xl '>
                  Ref Promo.{' '}
                  {validateNormalizeAmount(
                    selectedCoin,
                    product,
                    undefined,
                    'promoPrice'
                  )}
                </h5>
              )}
            <h5 className='text-xl  text-slate-600'>
              IVA Ref. {calcProductTax(product, product.taxRate, selectedCoin)}
            </h5>
            <h5 className='text-xl font-bold '>
              Total Ref. {validateNormalizeAmount(selectedCoin, product)}
            </h5>
          </div>
          <div
            className='whitespace-pre-wrap my-4'
            dangerouslySetInnerHTML={{
              __html: product.description || '',
            }}
          ></div>

          <AddProductToOrder product={product} />
        </>
      ) : (
        <div>
          <p className='text-sm font-bold text-slate-600'>
            Este producto no esta disponible en {selectedCoin.value}
          </p>
        </div>
      )}
    </>
  );
}
