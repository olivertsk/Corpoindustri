import { useAppGlobalStore } from '@/src/store/useAppGlobalStore';

export default function Breadcrumb() {
  const breadcrumbName = useAppGlobalStore((state) => state.breadcrumb);
  const secondBreadcrumb = useAppGlobalStore((state) => state.secondBreadcrumb);

  return (
    <div className='bg-slate-200 py-8 lg:p-8'>
      <h4 className='font-bold text-2xl'>{breadcrumbName}</h4>
      <p className=' text-lg'>{secondBreadcrumb}</p>
    </div>
  );
}
