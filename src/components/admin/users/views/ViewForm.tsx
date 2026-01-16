// src/components/views/ViewForm.tsx
import { primaryBtn, secondaryBtn } from '@/src/lib/global';
import { adminButtons } from '@/src/config/adminPages';
import { IViewPayloadForm } from '@/src/types/permissionsTypes';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

interface ViewFormProps {
  onSubmit: (data: IViewPayloadForm) => void;
  isLoading: boolean;
  initialData?: IViewPayloadForm;
}

export default function ViewForm({
  onSubmit,
  isLoading,
  initialData,
}: ViewFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IViewPayloadForm>({
    defaultValues: initialData || {
      name: '',
      icon: '',
      route: '',
      url: '',
      order: 0,
      // isMenu: true
    },
  });

  const iconOptions = adminButtons
    .filter((btn) => btn.url?.startsWith('/admin/') && btn.text)
    .map((btn) => {
      const segments = String(btn.url).split('/').filter(Boolean);
      const value = segments[segments.length - 1] || '';
      return { value, label: btn.text };
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Nombre *
        </label>
        <input
          {...register('name', { required: 'Nombre es requerido' })}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
        {errors.name && (
          <p className='mt-1 text-red-500 text-sm'>{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Icono *
        </label>
        <select
          {...register('icon', { required: 'Icono es requerido' })}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        >
          <option value=''>Seleccionar icono</option>
          {iconOptions.map((icon) => (
            <option key={icon.value} value={icon.value}>
              {icon.label}
            </option>
          ))}
        </select>
        {errors.icon && (
          <p className='mt-1 text-red-500 text-sm'>{errors.icon.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Ruta *
        </label>
        <input
          {...register('route', { required: 'Ruta es requerida' })}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
        {errors.route && (
          <p className='mt-1 text-red-500 text-sm'>{errors.route.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          URL API *
        </label>
        <input
          {...register('url', { required: 'URL API es requerida' })}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
        {errors.url && (
          <p className='mt-1 text-red-500 text-sm'>{errors.url.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Orden *
        </label>
        <input
          type='number'
          {...register('order', {
            required: 'Orden es requerido',
            valueAsNumber: true,
          })}
          className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm'
        />
        {errors.order && (
          <p className='mt-1 text-red-500 text-sm'>{errors.order.message}</p>
        )}
      </div>

      <div className='col-span-2 flex justify-center gap-2'>
        <button type='submit' disabled={isLoading} className={primaryBtn}>
          {isLoading ? 'Guardando...' : 'Guardar'}
        </button>
        <Link
          href={'/admin/users?tab=views'}
          type='button'
          className={secondaryBtn}
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
