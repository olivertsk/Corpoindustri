'use client';

import { getProducts, ProductFilters } from '@/src/api/ProductApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { tableBodyStyles } from '@/src/lib/global';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const thClass = 'text-center bg-primary py-2 text-white';

export default function ProductsPage() {
  useBreadcrumb('Productos', 'Todos los productos');
  const [filters] = useState<ProductFilters>({
    name: '',
    pag: 1,
  });

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(filters),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
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
            {data.data.map((item) => (
              <tr key={item.id}>
                <td className={tableBodyStyles}>{item.name}</td>
                <td className={tableBodyStyles}>{item.code}</td>
                <td className={tableBodyStyles}>{item.price}</td>
                <td className={tableBodyStyles}>{item.promotionalPrice}</td>
                <td className={tableBodyStyles}>{item.stock}</td>
                <td className={tableBodyStyles}>{item.department?.name}</td>
                <td className={tableBodyStyles}>{item.category?.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    );
}
