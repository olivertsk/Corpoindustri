'use client';
import { getOrders, OrderParams } from '@/src/api/OrderApi';
import OrderDetail from '@/src/components/orders/OrderDetail';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { primaryBtn, tableBodyStyles, thClass } from '@/src/lib/global';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

export default function OrdersPage() {
  useBreadcrumb('Ordenes', 'Todas las Ordenes');

  const [filters, setFilters] = useState<OrderParams>({
    pag: 1,
  });

  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(filters),
    queryKey: ['orders'],
  });

  console.log('data :>> ', data);

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        <section>
          <div>
            <table className='w-full rounded-md overflow-hidden bg-white'>
              <thead>
                <tr>
                  <th className={thClass}>Fecha</th>
                  <th className={thClass}>Nombre</th>
                  <th className={thClass}>Cédula</th>
                  <th className={thClass}>Teléfono</th>
                  <th className={thClass}>Estatus</th>
                  <th className={thClass}>Acción</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item) => (
                  <tr key={item.id}>
                    <td className={tableBodyStyles}>{item.date}</td>
                    <td className={tableBodyStyles}>{item.nameClient}</td>
                    <td className={tableBodyStyles}>
                      {item.dniType}-{item.dni}
                    </td>
                    <td className={tableBodyStyles}>{item.phoneNumber}</td>
                    <td className={tableBodyStyles}>{item.status}</td>
                    <td className={tableBodyStyles}>
                      <Link
                        href={`/admin/orders?orderId=${item.id}`}
                        className={primaryBtn}
                      >
                        Ver
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <OrderDetail />
      </>
    );
}
