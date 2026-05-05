'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CardProducts from '../products/CardProducts';
import { Product } from '@/src/types/product';
import Link from 'next/link';
import { Department } from '@/src/types/department';
import { ArrowRightCircleIcon } from '@heroicons/react/24/outline';

type ProductsSliderProps = {
  titleSection: string;
  products: Product[];
  departmentId?: Department['id'];
};

export default function ProductsSlider({
  titleSection,
  products,
  departmentId,
}: ProductsSliderProps) {
  return (
    <div className='px-3 pb-8 fade-up'>
      <div className='flex gap-8 justify-between lg:justify-normal items-center'>
        <h4 className='font-bold text-2xl text-primary my-4 display-title'>
          {titleSection}
        </h4>
        {departmentId && (
          <Link
            href={`/search?departmentIds=${departmentId}`}
            className='flex items-center gap-2 m-0 font-bold text-primary/80 uppercase leading-[0] hover:text-primary transition-colors'
          >
            Ver mas <ArrowRightCircleIcon className='w-6' />
          </Link>
        )}
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1400: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        navigation={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name} className='pb-6 lg:px-1 h-full'>
            <CardProducts product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
