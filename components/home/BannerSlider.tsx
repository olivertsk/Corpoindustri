'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import CategoriesCard from './CategoriesCard';

export default function BannerSlider() {
  return (
    <>
      <div className='relative'>
        <Swiper
          className='max-h-[300px]'
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className='max-h-[300px]'>
            <Image
              src='https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/4a/d3/38/inside-mercado.jpg?w=1200&h=-1&s=1'
              alt='mercado'
              objectFit='contain'
              width={1200}
              height={0}
              style={{
                width: '100%',
                objectFit: 'cover',
              }}
            />
          </SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
        </Swiper>
        <div className='absolute top-0 z-20 left-0 w-full h-full bg-gradient-to-b from-transparent from-[60%] to-gray-100'></div>
      </div>
      <div className='-mt-8 z-20  relative'>
        <div className='container mx-auto'>
          <CategoriesCard />
        </div>
      </div>
    </>
  );
}
