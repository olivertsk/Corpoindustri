'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CardProducts from '../products/CardProducts';
import { Product } from '@/src/types/product';

type ProductsSliderProps = {
  titleSection: string;
  products: Product[];
};

export default function ProductsSlider({
  titleSection,
  products,
}: ProductsSliderProps) {
  console.log(products);
  return (
    <div className='px-3 pb-8'>
      <h4 className='font-bold text-xl my-4'>{titleSection}</h4>
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
          1300: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        navigation={true}
      >
        {products.map((product) => (
          <SwiperSlide key={product.name} className='pb-6 lg:px-1'>
            <CardProducts product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
