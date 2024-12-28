import { getOrder } from '@/src/api/OrderApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import { thClass } from '@/src/lib/global';
import { Dialog } from '@mui/material';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function OrderDetail() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getOrder(orderId!),
    queryKey: ['order', orderId],
    enabled: orderId !== null,
  });

  return (
    <Dialog
      open={!!data}
      onClose={() => router.push('/admin/orders')}
      maxWidth='sm'
      fullWidth={true}
    >
      <div className='p-4'>
        <div className='flex justify-between'>
          <h4 className='font-bold text-lg'>Detalle de la Orden</h4>
          <Link href={'/admin/orders'}>
            <XCircleIcon className='w-7' />
          </Link>
        </div>
        <ul className='mt-4 space-y-1'>
          <li className='text-slate-600'>
            Fecha: <b> {data?.date}</b>
          </li>
          <li className='text-slate-600'>
            Nombre: <b> {data?.nameClient}</b>
          </li>
          <li className='text-slate-600'>
            Cédula:
            <b>
              {' '}
              {data?.dniType}-{data?.dni}
            </b>
          </li>
          <li className='text-slate-600'>
            Teléfono:
            <b> {data?.phoneNumber}</b>
          </li>
          <li className='text-slate-600'>
            Ubicación:
            <b> {data?.location}</b>
          </li>
          <li className='text-slate-600'>
            Observación:
            <b> {data?.observation || '-'}</b>
          </li>
        </ul>
        <div className='rounded-md overflow-hidden border mt-8'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className={thClass}>Producto</th>
                <th className={thClass}>Cantidad</th>
                <th className={thClass}>Precio Venta</th>
                <th className={thClass}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {data?.products.map((product) => (
                <tr key={product.productId} className='divide-y'>
                  <td className='py-2 px-4 border-b'>{product.product.name}</td>
                  <td className='py-2 px-4'>{product.quantity}</td>
                  <td className='py-2 px-4'>
                    <b>
                      {normalizeAmounts(
                        product.product.priceWithTax ||
                          product.product.promotionalPrice ||
                          product.product.price
                      )}
                    </b>
                  </td>
                  <td className='py-2 px-4'>
                    <b>
                      {normalizeAmounts(product.salePrice * product.quantity)}
                    </b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Dialog>
  );
}
