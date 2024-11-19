'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

const categories = [
  'Harinas',
  'Vegetales',
  'Quesos',
  'Charcuteria',
  'Carnes',
  'Granos',
];

type CategoriesCardProps = {
  titleSection?: string;
};

export default function CategoriesCard({ titleSection }: CategoriesCardProps) {
  return (
    <div className=' gap-4 px-3'>
      {titleSection && (
        <h4 className='font-bold text-xl my-4'>{titleSection}</h4>
      )}

      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        style={{
          overflowY: 'visible',
        }}
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
        {categories.map((category) => (
          <SwiperSlide key={category} className='pb-8'>
            <div className='bg-white shadow-md rounded-md p-4'>
              <h4 className='text-center font-bold'>{category}</h4>
              <svg
                className='mx-auto my-4 text-secondary'
                xmlns='http://www.w3.org/2000/svg'
                width='64'
                height='64'
                viewBox='0 0 14 14'
              >
                <path
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m5.53 10.85l.84 2.35M1.98.97l.34.94m3.21 8.94l-1.75-.43m1.75.43L6.6 9.4m-1.92-.9l-1.75-.44m1.75.44l1.08-1.45m-1.92-.91l-1.75-.43m1.75.43L4.91 4.7m-1.92-.91l-1.75-.43m1.75.43l1.08-1.45m5.44 7.91l-.56 2.25M11.85.8l-.22.9m-2.12 8.55L8.38 9.01m1.13 1.24l1.57-.56M10.06 8L8.94 6.76M10.06 8l1.58-.57m-1.02-1.68L9.5 4.51m1.12 1.24l1.58-.57M11.18 3.5l-1.12-1.24m1.12 1.24l1.58-.57'
                />
              </svg>
              <p className='text-center mb-4 text-sm'>
                Ingresa para ver todas las {category} disponibles
              </p>
              <button className='bg-accent-100 w-full rounded-md p-1 text-sm'>
                Ver
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
