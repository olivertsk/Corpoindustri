import Accordion from '@/src/components/accordion/Accordion';
import Paginator from '@/src/components/paginator/Paginator';
import CardProducts from '@/src/components/products/CardProducts';

export default function SearchPage() {
  const arr = new Array(10).fill(0);

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
                image:
                  'https://lh3.googleusercontent.com/p-K-FfFnpv0kgdVT1kNxI_lludARFkD-VpAFOimS0gbiIA9JxOP78PkQlhOnD6Q8W2cU-vvRkdLG0vdfvni86ChSo0UlXImPVYPJ2uUfAX78WSSd',
                name: 'Harina Pan',
                price: 1,
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
