'use client';

import Logo from '@/src/components/Logo';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useMultiCoinStore } from '@/src/store/multicoinStore';

export default function AdminPage() {
  useBreadcrumb('Admin', 'Dashboard');
  const currencies = useMultiCoinStore((state) => state.currencies);

  return (
    <div>
      <div className=' w-full h-full flex justify-center items-center mt-16 flex-wrap'>
        <Logo />
        <div className='w-full'>
          <div className='shadow-md p-8 max-w-lg mx-auto bg-primary/80 rounded-md mt-8'>
            <h4 className='text-lg text-center font-semibold text-white'>
              Taza de cambio hoy
            </h4>
            <div className='bg-gray-100 p-4 rounded-lg mt-4'>
              {currencies.map((currency) => (
                <div key={currency.code} className='flex justify-between'>
                  <p>{currency.name}</p>
                  <p className='font-bold'>{currency.exchangeRate}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
