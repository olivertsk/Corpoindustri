import { getOrders, OrderParams } from '@/src/api/OrderApi';
import OrderDetail from '@/src/components/orders/OrderDetail';
import Spinner from '@/src/components/spinner/Spinner';
import { editBtn } from '@/src/lib/global';
import { methodEnumTranslation } from '@/src/types/method';
import { translationsOrder, translationsOrderColor } from '@/src/types/order';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import TaskTable from '../TaskTable';
import { GridColDef } from '@mui/x-data-grid';
import './OrderTable.css';

type OrderTableProps = {
  isClient: boolean;
};

const queryKey = 'orders';

export default function OrderTable({ isClient = false }: OrderTableProps) {
  const allColumns: GridColDef[] = [
    { field: 'date', headerName: 'Fecha', flex: 1, minWidth: 150 },
    { field: 'nameClient', headerName: 'Nombre', flex: 1, minWidth: 150 },
    {
      field: 'dni',
      headerName: 'Cédula',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div>
          <span>
            {params.row.dniType}-{params.row.dni}
          </span>
        </div>
      ),
    },
    { field: 'phoneNumber', headerName: 'Teléfono', flex: 1, minWidth: 150 },
    {
      field: 'typePayment',
      headerName: 'Método de Pago',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div>
          {params.row.typePayment
            ? methodEnumTranslation[
                params.row.typePayment as keyof typeof methodEnumTranslation
              ]
            : '-'}
        </div>
      ),
    },
    {
      field: 'code',
      headerName: 'Código Orden',
      width: isClient ? 0 : 150,
      maxWidth: isClient ? 0 : 150,
      minWidth: isClient ? 0 : 150,
      headerClassName: isClient ? 'hidden' : 'text',
      cellClassName: isClient ? 'hidden' : '',
      renderHeader: () => (isClient ? null : 'Código Orden'),
      renderCell: (params) => (
        <div>{isClient ? null : <span>{params.row.code}</span>}</div>
      ),
    },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center justify-center h-full w-full'>
          <div
            style={{
              backgroundColor:
                translationsOrderColor[
                  params.row.status as keyof typeof translationsOrderColor
                ],
            }}
            className={`p-1 rounded-md font-bold text-white h-[32px] flex items-center justify-center w-full`}
          >
            {
              translationsOrder[
                params.row.status as keyof typeof translationsOrder
              ]
            }
          </div>
        </div>
      ),
    },
    {
      field: 'actions',
      headerName: 'Acción',
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={
              isClient
                ? `/profile/orders?orderId=${params.row.id}`
                : `/admin/orders?orderId=${params.row.id}`
            }
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Ver
          </Link>
        </div>
      ),
    },
  ];
  const [filters, setFilters] = useState<OrderParams>({
    pag: 1,
    isClient,
    limit: 10,
  });

  const { data, isLoading } = useQuery({
    queryFn: () => getOrders(filters),
    queryKey: [queryKey],
    refetchOnWindowFocus: false,
  });

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
            <TaskTable
              rows={data.data.map((item) => ({
                date: item.date,
                nameClient: item.nameClient,
                dniType: item.dniType,
                dni: item.dni,
                phoneNumber: item.phoneNumber,
                typePayment: item.typePayment,
                code: item?.code,
                status: item.status,
                id: item.id,
              }))}
              columns={allColumns}
              rowCount={data.meta.total}
              isLoading={isLoading}
              page={data.meta.actualPage - 1}
              pageSize={filters.limit!}
              onRowClick={() => {}}
              setFilters={setFilters}
              filters={filters}
              queryClientKey={queryKey}
            />
            <OrderDetail isClient={isClient} />
          </>
        )}
      </>
    );
}
