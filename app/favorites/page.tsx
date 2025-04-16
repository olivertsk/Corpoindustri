'use client';

import FavoriteCard from '@/src/components/favorites/FavoriteCard';
import Heading from '@/src/components/Heading';
import SubHeading from '@/src/components/SubHeading';
import { containerStyles } from '@/src/lib/global';
import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';
import { Pagination } from '@mui/material';

export default function FavoritesPage() {
  const totalPages = useAppGlobalStore((store) => store.totalPages);
  const page = useAppGlobalStore((store) => store.page);
  const setPage = useAppGlobalStore((store) => store.setPage);
  const favorites = useAppGlobalStore((store) => store.favorite);

  return (
    <main className='container mx-auto my-8'>
      <div className={containerStyles}>
        <Heading>Favoritos</Heading>
        <SubHeading>
          Aquí podrás ver todos los productos que has agregado a tus favoritos
        </SubHeading>
        <section className='mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
          {favorites.length > 0 &&
            favorites.map((product, index) => (
              <FavoriteCard key={index} favorite={product} />
            ))}
          {!favorites.length && (
            <h4 className='text-center col-span-4 font-bold text-2xl text-slate-500'>
              Aún no hay favoritos agregados.
            </h4>
          )}
        </section>
        {favorites.length > 0 && (
          <div className='mt-8 flex justify-center'>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, page) => setPage(page)}
              showFirstButton
              showLastButton
            />
          </div>
        )}
      </div>
    </main>
  );
}
