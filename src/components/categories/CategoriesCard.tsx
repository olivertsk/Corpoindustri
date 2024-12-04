'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ICategory } from '@/src/types/category';
import Image from 'next/image';
import { apiUrl } from '@/src/lib/global';

type CategoriesCardProps = {
  titleSection?: string;
  categoryData: ICategory[];
};

export default function CategoriesCard({
  titleSection,
  categoryData,
}: CategoriesCardProps) {
  if (categoryData)
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
              slidesPerView: categoryData.length < 2 ? categoryData.length : 2,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: categoryData.length < 3 ? categoryData.length : 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: categoryData.length < 4 ? categoryData.length : 4,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: categoryData.length < 5 ? categoryData.length : 5,
              spaceBetween: 16,
            },
            1300: {
              slidesPerView: categoryData.length < 6 ? categoryData.length : 6,
              spaceBetween: 16,
            },
          }}
          navigation={true}
        >
          {categoryData.map((category) => (
            <SwiperSlide key={category.id} className='pb-8 lg:px-1 !h-auto'>
              <div className='bg-white shadow-md rounded-xl p-4 h-full flex flex-col justify-between'>
                <div>
                  <h4 className='text-center font-bold'>{category.name}</h4>
                  <div className='my-4'>
                    <Image
                      width={100}
                      height={100}
                      src={`${apiUrl}/file/${category.icon}`}
                      alt={category.name}
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        height: '64px',
                        maxHeight: '64px',
                        objectFit: 'contain',
                      }}
                    />
                  </div>
                  <p className='text-center mb-4 text-sm'>
                    {category.description}
                  </p>
                </div>
                <button className='bg-accent-100 w-full rounded-xl p-1 text-sm font-bold'>
                  Ver
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}
