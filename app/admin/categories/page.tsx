'use client';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import Link from 'next/link';
const thClass = 'text-center bg-primary py-2 text-white';

export default function CategoriesPage() {
  useBreadcrumb('Categorías', 'Todas las categorías');
  return (
    <section>
      <h4 className='font-bold mb-2'>Filtros</h4>
      <div className='mb-4 flex gap-2'>
        <select name='' id='' className='bg-white rounded-md'>
          <option value=''>Todos</option>
          <option value=''>Categoria Destacada</option>
          <option value=''>Categoria No Destacada</option>
        </select>
        <input
          type='text'
          placeholder='Buscar Categorias'
          className='h-full py-2 rounded-md flex-1 px-4'
        />
        <Link
          href='categories/new'
          className='bg-accent-100 font-bold py-2 px-4 rounded-md'
        >
          Nueva Categoría
        </Link>
      </div>
      <table className='w-full rounded-md overflow-hidden'>
        <thead>
          <tr>
            <th className={thClass}>Nombre</th>
            <th className={thClass}>Estatus</th>
            <th className={thClass}>Destacada</th>
            <th className={thClass}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}
