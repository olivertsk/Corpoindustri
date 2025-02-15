import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';

export default function Breadcrumb({
  handleExpandMenu,
}: {
  handleExpandMenu: () => void;
}) {
  const breadcrumbName = useAppGlobalStore((state) => state.breadcrumb);
  const secondBreadcrumb = useAppGlobalStore((state) => state.secondBreadcrumb);

  return (
    <div className='bg-slate-200 py-8 lg:p-8 flex gap-4 px-4'>
      <button onClick={handleExpandMenu} className='lg:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='32'
          height='32'
          viewBox='0 0 24 24'
        >
          <path
            fill='currentColor'
            d='M3 18v-2h18v2zm0-5v-2h18v2zm0-5V6h18v2z'
          />
        </svg>
      </button>
      <div>
        <h4 className='font-bold text-2xl'>{breadcrumbName}</h4>
        <p className=' text-lg'>{secondBreadcrumb}</p>
      </div>
    </div>
  );
}
