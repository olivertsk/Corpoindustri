'use client';

import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

const thClass = 'text-center bg-primary py-2 text-white';

export default function ProductsPage() {
  useBreadcrumb('Productos', 'Todos los productos');

  return (
    <section>
      <table className='w-full rounded-md overflow-hidden'>
        <thead>
          <tr>
            <th className={thClass}>Nombre</th>
            <th className={thClass}>Código</th>
            <th className={thClass}>Precio</th>
            <th className={thClass}>Precio Promocional</th>
            <th className={thClass}>Stock</th>
            <th className={thClass}>Departamento</th>
            <th className={thClass}>Categoría</th>
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
