import BackBtn from '@/src/components/BackBtn';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import Image from 'next/image';

export default async function ProductShowPage() {
  // console.log('params :>> ', params.id);
  return (
    <>
      <div className='container mx-auto my-4'>
        <BackBtn />
      </div>
      <main className='container mx-auto bg-white pt-4 rounded-md shadow-sm'>
        <div className='grid grid-cols-3'>
          <div className='col-span-2 flex'>
            <aside className='max-w-[100px] p-4'>
              <div className='border-2 rounded-md border-accent-100'>
                <Image
                  width={2048}
                  height={0}
                  src='https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd'
                  alt='Harina Pan'
                  style={{
                    width: '100%',
                  }}
                />
              </div>
            </aside>
            <div className='pb-8'>
              <Image
                width={2048}
                height={0}
                src='https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd'
                alt='Harina Pan'
                style={{
                  width: '100%',
                }}
              />

              <h4 className='text-2xl font-bold mb-4'>
                Descripción del Producto
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
                corrupti obcaecati enim praesentium vero quasi consequuntur,
                veniam placeat, alias atque aliquam laborum tempore ipsum nihil
                corporis nobis omnis reiciendis in.
              </p>
              <br />
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit, alias doloribus sed nisi eius corporis officia
                illum dolore quaerat iusto vel, quis deleniti est. Odio labore
                consequatur fugit voluptas iusto! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Vel facere neque ipsum voluptate
                doloribus hic mollitia, illum velit placeat explicabo
                repudiandae dolorem, maxime vitae fugiat aliquam saepe.
                Repellat, voluptate repellendus.
              </p>
            </div>
          </div>
          <aside className='p-4'>
            <div className='border rounded-lg p-4'>
              <div className='flex justify-between items-center'>
                <h4 className='font-bold text-2xl mb-4'>Harina Pan 1KG</h4>
                <button className='text-accent-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='none'
                      stroke='currentColor'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='1.5'
                      d='M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79'
                    />
                  </svg>
                </button>
              </div>
              <h5 className='text-3xl font-bold mb-3'>{normalizeAmounts(1)}</h5>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Perferendis recusandae rerum ipsam doloribus. Voluptas
                asperiores suscipit libero modi pariatur rem magnam mollitia
                provident, aut inventore qui. Quas itaque non eligendi?
              </p>
              <button className='bg-accent-100 hover:bg-accent-200 transition-colors py-3 font-bold mt-8 w-full px-8 rounded-md'>
                Comprar
              </button>
            </div>
          </aside>
        </div>
      </main>
      <div className='container mx-auto mt-10'>
        <ProductsSlider titleSection='Productos Relacionados' />
      </div>
    </>
  );
}
