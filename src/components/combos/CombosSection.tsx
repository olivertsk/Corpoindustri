'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Combo } from '@/src/types/combo';
import ComboCard from './ComboCard';

type CombosSectionProps = {
  titleSection?: string;
  combos: Combo[];
};

export default function CombosSection({
  titleSection = 'Combos',
  combos,
}: CombosSectionProps) {
  console.log('combos :>> ', combos);
  if (!combos || combos.length === 0) {
    return null;
  }

  return (
    <div className='px-3 pb-8 fade-up'>
      <div className='flex gap-8 justify-between lg:justify-normal items-center'>
        <h4 className='font-bold text-2xl text-primary my-4 display-title'>
          {titleSection}
        </h4>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          300: { slidesPerView: 2, spaceBetween: 16 },
          640: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
          1400: { slidesPerView: 6, spaceBetween: 16 },
        }}
        navigation={true}
      >
        {combos.map((combo) => (
          <SwiperSlide
            key={combo.id || combo.slug}
            className='pb-6 lg:px-1 h-full'
          >
            <ComboCard combo={combo} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
