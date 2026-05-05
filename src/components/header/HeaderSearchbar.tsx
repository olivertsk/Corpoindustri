import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useMultiCoinStore } from '@/src/store/multicoinStore';
import { ArrowDown } from '../Icons';

export default function HeaderSearchbar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const coins = useMultiCoinStore((state) => state.coins);
  const selectedCoin = useMultiCoinStore((state) => state.selectedCoin);
  const setSelectedCoin = useMultiCoinStore((state) => state.setSelectedCoin);

  const onSearch = () => {
    router.push(`/search?name=${search}`);
    setSearch('');
  };

  return (
    <div className='flex-1 flex justify-center'>
      <div className='flex flex-1 max-w-2xl justify-between bg-white/95 rounded-2xl overflow-hidden items-center shadow-header border border-white/80'>
        <div className='flex items-center w-full'>
          <Menu>
            <MenuButton
              style={{
                backgroundColor: 'transparent',
              }}
              className='ml-2 h-9 flex items-center justify-center font-bold text-slate-700'
            >
              <div className='flex items-center mr-1'>
                <div
                  className={
                    'text-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm'
                  }
                  style={{ backgroundColor: selectedCoin.color }}
                >
                  <span className='text-xs'>{selectedCoin.value}</span>
                </div>
              </div>
              <ArrowDown />
            </MenuButton>

            <MenuItems
              anchor='bottom'
              className='space-y-2 origin-top-right rounded-xl border border-slate-200 p-2 bg-white shadow-md z-30 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
            >
              {coins.map((coin) => (
                <MenuItem as='div' key={coin.value}>
                  <button
                    onClick={() => setSelectedCoin(coin)}
                    className='text-white rounded-full h-8 w-8 flex items-center justify-center shadow-sm'
                    style={{ backgroundColor: coin.color }}
                  >
                    <span className='text-xs font-semibold'>{coin.value}</span>
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <input
            type='text'
            className='p-2.5 pr-2 lg:pr-8 w-full outline-none bg-transparent text-slate-700 placeholder:text-slate-400'
            placeholder='Buscar Productos...'
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={onSearch}
          className='h-full px-1 rounded-xl hover:bg-slate-50 transition-colors'
        >
          <div className='bg-primary flex justify-center items-center rounded-xl p-2 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='#ffffff'
                d='M9.5 4a6.5 6.5 0 0 1 6.5 6.5c0 1.62-.59 3.1-1.57 4.23l5.65 5.65l-.71.71l-5.65-5.65A6.47 6.47 0 0 1 9.5 17A6.5 6.5 0 0 1 3 10.5A6.5 6.5 0 0 1 9.5 4m0 1A5.5 5.5 0 0 0 4 10.5A5.5 5.5 0 0 0 9.5 16a5.5 5.5 0 0 0 5.5-5.5A5.5 5.5 0 0 0 9.5 5'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
}
