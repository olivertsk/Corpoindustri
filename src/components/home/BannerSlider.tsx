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

type BannerSliderProps = {
  slides: IBanner[];
  showFadeOut?: boolean;
  floatingBanner?: boolean;
  redirectTo?: string;
};

// Componente de copo de nieve individual
const Snowflake = () => {
  const size = Math.random() * 8 + 4; // Tamaño entre 4px y 12px
  const left = Math.random() * 100; // Posición horizontal aleatoria
  const animationDuration = Math.random() * 5 + 5; // Duración entre 5s y 10s
  const opacity = Math.random() * 0.7 + 0.3; // Opacidad entre 0.3 y 1
  const delay = Math.random() * 5; // Retardo aleatorio

  return (
    <div
      className="absolute top-0 pointer-events-none z-10"
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `snowfall ${animationDuration}s linear ${delay}s infinite`,
        opacity: opacity,
      }}
    >
      <div
        className="w-full h-full bg-white rounded-full"
        style={{
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
};

// Componente contenedor de efectos de nieve
const SnowEffect = ({ snowflakeCount = 50 }: { snowflakeCount?: number }) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {Array.from({ length: snowflakeCount }).map((_, index) => (
        <Snowflake key={index} />
      ))}
    </div>
  );
};

export default function BannerSlider({
  showFadeOut,
  slides,
  floatingBanner,
  redirectTo,
}: BannerSliderProps) {
  const router = useRouter();
  const handleRedirect = () => {
    if (redirectTo) {
      router.push(`${redirectTo}`);
    }
  };

  return (
    <>
      <style jsx global>{`
        @keyframes snowfall {
          0% {
            transform: translateY(-100px) rotate(0deg);
          }
          100% {
            transform: translateY(calc(100vh + 100px)) rotate(360deg);
          }
        }
      `}</style>
      
      <div
        className={`relative overflow-hidden ${
          floatingBanner && ' sm:shadow-2xl sm:mt-8 sm:rounded-xl'
        } ${redirectTo ? 'cursor-pointer' : ''}`}
        onClick={handleRedirect}
      >
        {/* Efecto de nieve solo cuando NO es floatingBanner */}
        {!floatingBanner && <SnowEffect snowflakeCount={50} />}
        
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
                  <picture className='relative w-full h-[420px]'>
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
                      height={1024}
                      style={{
                        width: '100%',
                        height: '420px',
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
