import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HeaderSearchbar() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const onSearch = () => {
    router.push(`/search?name=${search}`);
    setSearch('');
  };

  return (
    <div className='flex-1 flex justify-center'>
      <div className='flex flex-1 max-w-2xl justify-between bg-white rounded-full overflow-hidden items-center shadow-header'>
        <input
          type='text'
          className='p-2.5 px-8 pr-2 lg:pr-8 w-full outline-none'
          placeholder='Buscar Productos...'
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={onSearch} className='  h-full px-4 lg:px-2 lg:pl-1'>
          <div className='bg-primary flex justify-center items-center rounded-full p-1'>
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
