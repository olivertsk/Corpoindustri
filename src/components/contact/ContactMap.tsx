'use client';
import React from 'react';
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { TMap } from '@/src/types/map';

export default function ContactMap({ mapData }: { mapData: { data: TMap[] } }) {
  return (
    <div className='relative'>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        modules={[Navigation, Autoplay]}
        loop={false}
      >
        {mapData.data.map((item) => (
          <SwiperSlide key={item.id}>
            <iframe
              src={item.map}
              width='100%'
              height='420'
              style={{ border: 0 }}
              allowFullScreen
              loading='lazy'
              referrerPolicy='no-referrer-when-downgrade'
              title='Mapa de cobertura Corpoindustri'
            ></iframe>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
