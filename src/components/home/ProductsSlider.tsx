'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CardProducts from '../products/CardProducts';
import { Product } from '@/src/types/product';

const products: Product[] = [
  {
    name: 'Harina Pan',
    coverImage:
      'https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd',
    code: '12',
    departmentId: '',
    categoryId: '',
    description: 'descripcion',
    images: [{
      id: '1',
      alt: 'Harina pan',
      file: 'https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd',
      isVideo: false,
      productId: '1',
      position: 1
    }],
    price: 1,
    status: true,
    longDescription: '',
    promotionalPrice: null,
    stock: 1,
    brand: '',
    taxRate: 0,
  },
  {
    name: 'Frijoles',
    coverImage:
      'https://lacolonia.vtexassets.com/arquivos/ids/223824-800-800?v=637352996875900000&width=800&height=800&aspect=true',
    price: 2.5,
    code: '12',
    stock: 1,
    departmentId: '',
    categoryId: '',
    description: 'descripcion',
    images: [{
      id: '1',
      alt: 'Frijoles',
      file: 'https://lacolonia.vtexassets.com/arquivos/ids/223824-800-800?v=637352996875900000&width=800&height=800&aspect=true',
      isVideo: false,
      productId: '1',
      position: 1
    }],
    status: true,
    longDescription: '',
    promotionalPrice: null,
    brand: '',
    taxRate: 0,
  },
  {
    name: 'Salsa de tomate',
    coverImage:
      'https://vallearriba.elplazas.com/media/catalog/product/cache/3e568157972a1320c1e54e4ca9aac161/1/0/10014472un_3.jpg',
    price: 2.47,
    code: '12',
    stock: 1,
    departmentId: '',
    categoryId: '',
    description: 'descripcion',
    images: [{
      id: '1',
      alt: 'Frijoles',
      file: 'https://vallearriba.elplazas.com/media/catalog/product/cache/3e568157972a1320c1e54e4ca9aac161/1/0/10014472un_3.jpg',
      isVideo: false,
      productId: '1',
      position: 1
    }],
    status: true,
    longDescription: '',
    promotionalPrice: null,
    brand: '',
    taxRate: 0,
  },
];

type ProductsSliderProps = {
  titleSection: string;
};

export default function ProductsSlider({ titleSection }: ProductsSliderProps) {
  return (
    <div className='px-3 pb-8'>
      <h4 className='font-bold text-xl my-4'>{titleSection}</h4>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 16,
          },
        }}
        navigation={true}
      >
        {products.map((prduct) => (
          <SwiperSlide key={prduct.name} className='pb-6 lg:px-1'>
            <CardProducts product={prduct} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
