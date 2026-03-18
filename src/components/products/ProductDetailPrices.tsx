'use client';
import { Product } from '@/src/types/product';
import React from 'react';
import AddProductToOrder from './AddProductToOrder';
import { useCalcAmount } from '@/src/hooks/useCalcAmount';

type ProductDetailPricesProps = {
  product: Product;
};

export default function ProductDetailPrices({
  product,
}: ProductDetailPricesProps) {
  const { choosePrice, validateNormalizeAmount, calcProductTax, currentCoin } =
    useCalcAmount();

  const productPrice = product.priceBs;
  const productPromotionalPrice = product.promotionalPriceBs;

  const totalRef = choosePrice(product);

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
              Ref. {validateNormalizeAmount(product, undefined, 'price')}
            </h5>
            {product.promotionalPrice !== null &&
              product.promotionalPrice > 0 && (
                <h5 className='text-xl '>
                  Ref Promo.{' '}
                  {validateNormalizeAmount(product, undefined, 'promoPrice')}
                </h5>
              )}
            <h5 className='text-xl  text-slate-600'>
              IVA Ref. {calcProductTax(product, product.taxRate)}
            </h5>
            <h5 className='text-xl font-bold '>
              Total Ref. {validateNormalizeAmount(product)}
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
            Este producto no esta disponible en {currentCoin.value}
          </p>
        </div>
      )}
    </>
  );
}
