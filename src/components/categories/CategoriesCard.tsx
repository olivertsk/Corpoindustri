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
      <div>
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
              <div className='section-shell shadow-sm rounded-2xl p-4 h-full flex flex-col justify-between border border-white/80 group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_rgba(25,88,172,0.15)]'>
                <div>
                  <p className='text-[11px] uppercase tracking-[0.12em] text-slate-400 text-center font-semibold'>
                    Categoría destacada
                  </p>
                  <h4 className='text-center font-bold text-primary text-xl mt-1 leading-tight min-h-[56px] flex items-center justify-center'>
                    {category.name}
                  </h4>
                  <div className='my-3 rounded-xl border border-slate-100 bg-white p-2'>
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
                        objectFit: 'contain',
                      }}
                      className='rounded-lg transition-transform duration-300 group-hover:scale-[1.03]'
                    />
                  </div>
                </div>
                <Link
                  href={`/search?departmentIds=${category.departmentId}&categoriesIds=${category.id}`}
                  className={`${primaryBtn} rounded-xl !py-2.5 !px-3 text-sm text-center w-full`}
                  aria-label={`Ver productos de la categoría ${category.name}`}
                >
                  Ver categoría
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
}
