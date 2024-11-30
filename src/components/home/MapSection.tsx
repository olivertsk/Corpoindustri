'use client';

import { apiUrl } from '@/src/lib/global';
import { TMap } from '@/src/types/map';
import Image from 'next/image';
import React from 'react';
// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';

type MapSeccionProps = {
    data: TMap[];
  };
export const MapSection = ({ data }: MapSeccionProps) => {
    return (
        <>
            <div className='relative'>
                <Swiper
                spaceBetween={50}
                slidesPerView={1}
                navigation={true}
                modules={[Navigation, Autoplay]}
                loop={false}
                >
                    {data.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className='w-full flex p-4 z-10 align-baseline'>
                                <div className="w-[50%] p-4 flex flex-col" style={{ height: "450" }}>
                                    <div className='w-[90%] h-[50%] m-auto'>
                                        <Image 
                                            className='w-full h-[100%] rounded'
                                            width={400}
                                            height={250}
                                            src={`${apiUrl}/file/${item.image}`}
                                            alt="Imagen del concesionario Dimca Toyota"
                                            style={{
                                                aspectRatio: 16/9,
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                    <div className='h-[50%] mt-4'>
                                        { item?.description &&
                                            <h2>{item.description}</h2>
                                        }
                                        <div className='flex w-full' style={{ grid: 'repeat(auto-fit,minmax(50%,1fr))' }}>
                                            <div className='flex flex-col w-[50%] p-4'>
                                                <h2 className='underline'>
                                                    Nombre
                                                </h2>
                                                <p>
                                                {item.name}
                                                </p>
                                                <h2 className='underline mt-5'>
                                                    Teléfono
                                                </h2>
                                                <p>
                                                {item.phoneNumber}
                                                </p>
                                            </div>
                                            <div className='flex flex-col w-[50%] p-4' style={{ borderLeft: '1px solid rgb(204, 204, 204)' }}>
                                                <h2 className='underline'>
                                                    Correo
                                                </h2>
                                                <p>
                                                {item.email}
                                                </p>
                                                <h2 className='underline mt-5'>
                                                    Dirección
                                                </h2>
                                                <p>
                                                {item.address}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-[50%] p-4 rounded" style={{ height: "450" }}>
                                    <iframe
                                        style={{ border: 'none' }}
                                        src={item.map}
                                        width="600"
                                        height="450"
                                        allowFullScreen
                                        title="Google Maps"
                                    ></iframe>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>

    );
};