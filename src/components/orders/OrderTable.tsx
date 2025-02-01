import { getOrders, OrderParams } from '@/src/api/OrderApi';
import OrderDetail from '@/src/components/orders/OrderDetail';
import Spinner from '@/src/components/spinner/Spinner';
import { primaryBtn, tableBodyStyles, thClass } from '@/src/lib/global';
import { methodEnumTranslation } from '@/src/types/method';
import { translationsOrder, translationsOrderColor } from '@/src/types/order';
import { Pagination } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';

type OrderTableProps = {
  isClient: boolean;
};

export default function OrderTable({ isClient = false }: OrderTableProps) {
  const [filters, setFilters] = useState<OrderParams>({
    pag: 1,
    isClient,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(filters),
    queryKey: ['orders'],
    refetchOnWindowFocus: false,
  });

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        {data.data.length === 0 ? (
          <div className='flex justify-center my-8'>
            <p className='text-2xl text-slate-400'>No hay ordenes...</p>
          </div>
        ) : (
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
                      <th className={thClass}>Método de Pago</th>
                      {!isClient && <th className={thClass}>Código Orden</th>}
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
                        <td className={tableBodyStyles}>
                          {item.typePayment
                            ? methodEnumTranslation[item.typePayment]
                            : '-'}
                        </td>
                        {!isClient && (
                          <td className={tableBodyStyles}>{item.code}</td>
                        )}
                        <td className={tableBodyStyles}>
                          <div
                            style={{
                              backgroundColor:
                                translationsOrderColor[item.status],
                            }}
                            className={`p-1 rounded-md font-bold text-white `}
                          >
                            {translationsOrder[item.status]}
                          </div>
                        </td>
                        <td className={tableBodyStyles}>
                          <Link
                            href={
                              isClient
                                ? `/profile/orders?orderId=${item.id}`
                                : `/admin/orders?orderId=${item.id}`
                            }
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
              <div className='flex justify-center mt-8'>
                <Pagination
                  count={data.meta.totalPage}
                  page={data.meta.actualPage}
                  onChange={(_, page) => changePage(page)}
                  showFirstButton
                  showLastButton
                />
              </div>
            </section>
            <OrderDetail isClient={isClient} />
          </>
        )}
      </>
    );
}
