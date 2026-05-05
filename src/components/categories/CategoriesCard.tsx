'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { ICategory } from '@/src/types/category';
import Image from 'next/image';
import { apiUrl, primaryBtn } from '@/src/lib/global';
import Link from 'next/link';

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
          <h4 className='font-bold text-2xl text-primary my-4 display-title'>
            {titleSection}
          </h4>
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
              <div className='section-shell shadow-sm rounded-2xl p-4 h-full flex flex-col justify-between border border-white/80'>
                <div>
                  <h4 className='text-center font-bold text-primary text-xl'>
                    {category.name}
                  </h4>
                  <div className='my-2'>
                    <Image
                      width={200}
                      height={200}
                      quality={50}
                      src={`${apiUrl}/file/${category.icon}`}
                      alt={category.name}
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        height: '128px',
                        maxHeight: '128px',
                        objectFit: 'cover',
                      }}
                      className='rounded-xl'
                    />
                  </div>
                  <p className='text-center mb-4 text-sm text-slate-600 line-clamp-3 min-h-[60px]'>
                    {category.description}
                  </p>
                </div>
                <Link
                  href={`/search?departmentIds=${category.departmentId}&categoriesIds=${category.id}`}
                  className={`${primaryBtn} rounded-xl !p-2 text-sm text-center`}
                >
                  Ver
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}
