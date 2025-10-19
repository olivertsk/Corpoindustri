'use client';

import { useRouter } from 'next/navigation';
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

type BannerSliderFilterProps = {
  slides: IBanner[];
  showFadeOut?: boolean;
  floatingBanner?: boolean;
  redirectTo?: string;
};

export default function BannerSliderFilter({
  showFadeOut,
  slides,
  floatingBanner,
  redirectTo,
}: BannerSliderFilterProps) {
  const router = useRouter();
  const handleRedirect = () => {
    if (redirectTo) {
      router.push(`${redirectTo}`);
    }
  };

  return (
    <>
      <div
        className={`relative overflow-hidden ${
          floatingBanner && ' sm:shadow-2xl sm:mt-8 sm:rounded-xl'
        } ${redirectTo ? 'cursor-pointer' : ''}`}
        onClick={handleRedirect}
      >
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
          {slides.map(
            (slide) =>
              slide.images && (
                <SwiperSlide key={slide.id}>
                  <picture className='relative w-full'>
                    <source
                      srcSet={`${apiUrl}/file/${
                        slide.mobileImage || slide.images
                      }`}
                      media='(max-width: 768px)'
                    />
                    <img
                      src={`${apiUrl}/file/${slide.images}`}
                      alt={slide?.description || 'mercado'}
                      width={2048}
                      style={{
                        width: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </picture>
                </SwiperSlide>
              )
          )}
        </Swiper>
        {showFadeOut && (
          <div className='absolute bottom-0 z-20 left-0 w-full h-[40%] bg-gradient-to-b from-transparent from-[60%] to-gray-100'></div>
        )}
      </div>
    </>
  );
}
