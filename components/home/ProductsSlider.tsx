'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CardProducts from '../products/CardProducts';
import { Product } from '@/types';

const products: Product[] = [
  {
    name: 'Harina Pan',
  },
  {
    name: 'Frijoles',
  },
  {
    name: 'Salsa de tomate asdasdasdds',
  },
];

export default function ProductsSlider() {
  return (
    <div className='px-3'>
      <h4 className='font-bold text-xl my-4'>Productos Destacados</h4>
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
        {products.map((prduct) => (
          <SwiperSlide key={prduct.name}>
            <CardProducts product={prduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
