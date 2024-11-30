'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { apiUrl } from '@/src/lib/global';
import { IBanner } from '@/src/types/banner';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';


// type slidesData = {
//   id: string,
//   images: string,
//   name?: string,
//   description?: string
// }

type BannerSliderProps = {
  slides: IBanner[];
  showFadeOut?: boolean;
};

export default function BannerSlider({
  showFadeOut,
  slides,
}: BannerSliderProps) {
  return (
    <>
      <div className='relative'>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          navigation={true}
          modules={[Navigation, Autoplay]}
          loop={true}
          autoplay={{
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
            delay: 5000,
          }}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <Image
                src={`${apiUrl}/file/${slide.images}`}
                alt={slide?.alt || 'mercado' }
                objectFit='contain'
                width={1200}
                height={250}
                style={{
                  width: '100%',
                  height: '350px',
                  objectFit: 'cover',
                  aspectRatio: '16/9',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {showFadeOut && (
          <div className='absolute bottom-0 z-20 left-0 w-full h-[40%] bg-gradient-to-b from-transparent from-[60%] to-gray-100'></div>
        )}
      </div>
    </>
  );
}
