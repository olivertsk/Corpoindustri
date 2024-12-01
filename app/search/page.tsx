import Accordion from '@/src/components/accordion/Accordion';
import Paginator from '@/src/components/paginator/Paginator';
import CardProducts from '@/src/components/products/CardProducts';
import { Product } from '@/src/types/product';

export default function SearchPage() {
  const arr = new Array(10).fill(0);
  const images: Product['images'] = [{
    id: '1',
    alt: 'Harina pan',
    file: 'https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd',
    isVideo: false,
    productId: '1',
    position: 1
  }]
  return (
    <>
      <main className='container mx-auto grid grid-cols-4  lg:gap-4 lg:py-8 p-4 gap-y-4'>
        <aside className='col-span-4 lg:col-span-1'>
          <Accordion />
        </aside>
        <div className='col-span-4 lg:col-span-3 grid grid-cols-4 gap-4'>
          {arr.map(() => (
            <CardProducts
              className='col-span-2 lg:col-span-1'
              key={Math.random()}
              product={{
                code: '123',
                departmentId: '',
                categoryId: '',
                description: 'descripcion',
                name: 'Harina Pan',
                coverImage: 'https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd',
                images: images,
                price: 1,
                status: true,
                longDescription: '',
                promotionalPrice: null,
                stock: 1,
                brand: '',
                taxRate: 0,
              }}
            />
          ))}
        </div>
        <div className='col-span-4 flex justify-center mt-4'>
          <Paginator />
        </div>
      </main>
    </>
  );
}
