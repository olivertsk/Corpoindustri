'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ICategory } from '@/src/types/category';
import CategoryIcon from './CategorySVG';
import Image from 'next/image';

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
            <SwiperSlide key={category.id} className='pb-8'>
              <div className='bg-white shadow-md rounded-md p-4'>
                <h4 className='text-center font-bold'>{category.name}</h4>
                <div className='my-4'>
                  { category.icon.includes('.svg') &&
                    <CategoryIcon iconUrl={category.icon} fillColor="#334155" width="64px" height="64px" />
                  }
                  { !category.icon.includes('.svg') &&
                    <Image
                    width={64}
                    height={64}
                    src={category.icon}
                    alt={category.name}
                    style={{
                      width: '100%',
                    }}
                    />
                  }
                </div>
                <p className='text-center mb-4 text-sm'>
                 {category.description}
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
