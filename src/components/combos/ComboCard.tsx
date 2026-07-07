'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Combo } from '@/src/types/combo';
import { apiUrl } from '@/src/lib/global';
import {
  normalizeAmounts,
  normalizeAmountsBs,
} from '@/src/utils/normalizeAmounts';
import AddComboToCart from './AddComboToCart';

type ComboCardProps = {
  combo: Combo;
  className?: string;
};

export default function ComboCard({ combo, className }: ComboCardProps) {
  const products = combo.products || [];
  return (
    <div
      className={`section-shell product flex flex-col shadow-sm rounded-2xl pb-3 overflow-hidden ${className || ''} relative group min-h-[380px] border border-white/80 hover:shadow-[0_14px_30px_rgba(15,39,70,0.14)] transition-shadow`}
    >
      <Link href={`/combos/${combo.slug}`} className='block'>
        <Image
          width={1024}
          height={1024}
          alt={`${combo.name} - Combo en Corpoindustri`}
          src={
            combo.coverImage
              ? `${apiUrl}/file/${combo.coverImage}`
              : '/logo.png'
          }
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1/1',
            objectFit: combo.coverImage ? 'cover' : 'contain',
          }}
        />
        <h5 className='px-4 font-bold overflow-hidden text-ellipsis text-base mt-3 h-[calc(1.25rem*2)] leading-5 line-clamp-2 text-slate-800'>
          {combo.name}
        </h5>
      </Link>

      <div className='px-4 mt-2'>
        <p className='text-lg font-black text-primary'>
          {normalizeAmounts(combo.price)}
        </p>
        {!!combo.priceBs && (
          <p className='text-sm font-semibold text-slate-500'>
            {normalizeAmountsBs(combo.priceBs)}
          </p>
        )}
      </div>

      {/* Burbujas con miniaturas de los productos incluidos */}
      {products.length > 0 && (
        <div className='px-4 mt-3 flex flex-wrap items-center gap-1.5'>
          {products.slice(0, 5).map((item) => (
            <div
              key={item.productId}
              className='relative'
              title={item.productDetail?.name}
            >
              <Image
                width={36}
                height={36}
                alt={item.productDetail?.name || 'Producto'}
                src={
                  item.productDetail?.coverImage ||
                  item.productDetail?.images?.[0]?.file
                    ? `${apiUrl}/file/${item.productDetail?.coverImage || item.productDetail?.images?.[0]?.file}`
                    : '/logo.png'
                }
                className='w-9 h-9 rounded-full object-cover border border-slate-200 bg-white'
              />
              {item.quantity > 1 && (
                <span className='absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full px-1 leading-tight'>
                  x{item.quantity}
                </span>
              )}
            </div>
          ))}
          {products.length > 5 && (
            <span className='text-xs text-slate-400 font-semibold'>
              +{products.length - 5}
            </span>
          )}
        </div>
      )}

      <div className='min-h-12 flex items-center justify-center px-4 mt-auto pt-3'>
        <AddComboToCart combo={combo} />
      </div>
    </div>
  );
}
