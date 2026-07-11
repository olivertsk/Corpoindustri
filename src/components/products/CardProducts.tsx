import Image from 'next/image';
import Link from 'next/link';

import HandleProductClick from './HandleProductClick';
import { Product } from '@/src/types/product';
import { apiUrl } from '@/src/lib/global';
import CardProductPrice from './CardProductPrice';
import { buildProductSlug } from '@/src/utils/productSlug';
import { Rating } from '@mui/material';

type CardProductsProps = {
  product: Product;
  className?: string;
};

export default function CardProducts({
  product,
  className,
}: CardProductsProps) {
  const productSlug = buildProductSlug({ id: product.id, name: product.name });

  return (
    <div
      className={`section-shell product block shadow-sm rounded-2xl pb-3 overflow-hidden ${className} relative group min-h-[350px] border border-white/80 hover:shadow-[0_14px_30px_rgba(15,39,70,0.14)] transition-shadow`}
    >
      {/* <div className='absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity'>
        <AddProductFavorite product={product} />
      </div> */}
      <Link href={`/productos/${productSlug}`} className='block'>
        <Image
          width={1024}
          height={1024}
          alt={`${product.name} - ${product.department?.name || 'Categoria'} en Corpoindustri`}
          src={
            product?.coverImage || (product?.images && product?.images[0])
              ? `${apiUrl}/file/${
                  product?.coverImage || product?.images[0]?.file
                }`
              : '/logo.png'
          }
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '1/1',
            objectFit:
              product?.coverImage || (product?.images && product?.images[0])
                ? 'cover'
                : 'contain',
          }}
          loading='lazy'
        />
        <div className='px-3'>
          <Rating
            name='product-rating-summary'
            value={Number(product.avgRating || 0)}
            precision={0.1}
            readOnly
            size='small'
          />
        </div>
        <h4 className='px-4 overflow-hidden text-ellipsis text-sm mt-3 text-slate-400'>
          {product.department?.name}
        </h4>
        <h5 className='px-4 font-bold overflow-hidden text-ellipsis text-base mt-2 h-[calc(1.25rem*2)] leading-5 line-clamp-2 text-slate-800'>
          {product.name}
        </h5>
      </Link>
      <CardProductPrice product={product} />

      <div className='min-h-12 flex items-center justify-center px-4 mt-2'>
        <HandleProductClick product={product} />
      </div>
    </div>
  );
}
