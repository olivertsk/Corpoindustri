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
  downloadUrl?: string;
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
      className='absolute top-0 pointer-events-none z-10'
      style={{
        left: `${left}%`,
        width: `${size}px`,
        height: `${size}px`,
        animation: `snowfall ${animationDuration}s linear ${delay}s infinite`,
        opacity: opacity,
      }}
    >
      <div
        className='w-full h-full bg-white rounded-full'
        style={{
          boxShadow: '0 0 6px rgba(255, 255, 255, 0.8)',
          filter: 'blur(0.5px)',
        }}
      />
    </div>
  );
};

const Confetti = () => {
  const colors = ['#facc15', '#ec4899', '#3b82f6', '#22c55e', '#a855f7']; // Colores vivos
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const duration = Math.random() * 3 + 3;
  const delay = Math.random() * 5;

  return (
    <div
      className='absolute top-0 pointer-events-none z-10'
      style={{
        left: `${left}%`,
        width: '10px',
        height: '10px',
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px', // Mezcla de círculos y cuadrados
        animation: `snowfall ${duration}s linear ${delay}s infinite`,
      }}
    />
  );
};

const getSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1; // Enero es 0
  const day = now.getDate();

  // Navidad: 1 de Diciembre al 6 de Enero
  if (month === 12 || (month === 1 && day <= 6)) return 'christmas';

  // Carnaval: Variable, pero usualmente Febrero/Marzo.
  // Para simplificar, usemos Febrero completo o fechas específicas de 2026 (16-17 Feb)
  if (month === 2) return 'carnival';

  // Independencia de Venezuela: 5 de Julio
  if (month === 7 && day === 5) return 'patriotic';

  return 'none';
};

export default function BannerSlider({
  showFadeOut,
  slides,
  floatingBanner,
  redirectTo,
  downloadUrl,
}: BannerSliderProps) {
  const router = useRouter();
  const season = getSeason();
  const handleRedirect = () => {
    if (downloadUrl) {
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', '');
      link.setAttribute('target', '_blank');
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
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
          floatingBanner && ' sm:shadow-2xl  sm:rounded-xl'
        } ${redirectTo || downloadUrl ? 'cursor-pointer' : ''}`}
        onClick={handleRedirect}
      >
        {/* Efecto de nieve solo cuando NO es floatingBanner */}
        {/* {!floatingBanner && <SnowEffect snowflakeCount={50} />} */}
        {!floatingBanner && (
          <div className='absolute inset-0 pointer-events-none z-10 overflow-hidden'>
            {season === 'christmas' &&
              Array.from({ length: 40 }).map((_, i) => <Snowflake key={i} />)}

            {season === 'carnival' &&
              Array.from({ length: 50 }).map((_, i) => <Confetti key={i} />)}

            {season === 'patriotic' && (
              <div className='absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-blue-500/10 to-red-500/10 animate-pulse' />
            )}
          </div>
        )}
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
              ),
          )}
        </Swiper>
        {showFadeOut && (
          <div className='absolute bottom-0 z-20 left-0 w-full h-[40%] bg-gradient-to-b from-transparent from-[60%] to-gray-100'></div>
        )}
      </div>
    </>
  );
}
