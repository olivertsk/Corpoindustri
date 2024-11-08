'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import CategoriesCard from './CategoriesCard';
import { Autoplay, Navigation } from 'swiper/modules';

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
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 5000,
          }}
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
          <SwiperSlide>hola</SwiperSlide>
        </Swiper>
        <div className='absolute bottom-0 z-20 left-0 w-full h-[40%] bg-gradient-to-b from-transparent from-[60%] to-gray-100'></div>
      </div>
      <div className='-mt-8 z-20  relative'>
        <div className='container mx-auto'>
          <CategoriesCard />
        </div>
      </div>
    </>
  );
}
