import { getOrder, updateOrderStatus } from '@/src/api/OrderApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { normalizeAmounts } from '@/src/utils/normalizeAmounts';
import { primaryBtn, thClass } from '@/src/lib/global';
import { Dialog } from '@mui/material';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { EStatusOrder, translationsOrder } from '@/src/types/order';
import { useMemo, useState } from 'react';
import { normalizeDate } from '@/src/utils/normalizeDate';
import { methodEnumTranslation } from '@/src/types/method';
import MethodOption from '../cart/MethodOption';

type OrderDetailProps = {
  isClient: boolean;
};

export default function OrderDetail({ isClient }: OrderDetailProps) {
  const [isDeclining, setIsDeclining] = useState(false);
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => getOrder(orderId!),
    queryKey: ['order', orderId],
    enabled: orderId !== null,
  });

  const total = useMemo(() => {
    if (!data) return 0;
    return data.products.reduce(
      (acc, item) => acc + item.salePrice * item.quantity,
      0
    );
  }, [data]);
  const returnLink = isClient ? `/profile/orders` : `/admin/orders`;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      router.push(returnLink);
      setIsDeclining(false);
      toast.success('Orden actualizada');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reason = new FormData(e.currentTarget).get('reason') as string;

    mutate({
      orderId: data!.id,
      status: EStatusOrder.Decline,
      reason,
    });
  };

  return (
    <>
      <Dialog
        open={!!data}
        onClose={() => (router.push(returnLink), setIsDeclining(false))}
        maxWidth='sm'
        fullWidth={true}
      >
        {data && (
          <>
            <div className='p-4'>
              <div className='flex justify-between'>
                <h4 className='font-bold text-lg'>Detalle de la Orden</h4>
                <Link href={returnLink}>
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
                <li className='text-slate-600'>
                  Método de pago:
                  <b>
                    {' '}
                    {data.typePayment
                      ? methodEnumTranslation[data.typePayment]
                      : '-'}
                  </b>
                </li>
                {data.method && (
                  <li className='text-slate-600'>
                    Opción Seleccionada:{' '}
                    <div>
                      <MethodOption isAdmin={true} method={data.method} />{' '}
                    </div>
                  </li>
                )}
                <li className='text-slate-600'>
                  Referencia: <b>{data.reference}</b>
                </li>
                {data?.status !== EStatusOrder.Pending && !isClient && (
                  <>
                    <li className='text-slate-600'>
                      Cambiado por:
                      <b> {data?.admin?.name || '-'}</b>
                    </li>
                    <li className='text-slate-600'>
                      Fecha de cambio:
                      <b>
                        {' '}
                        {data?.updatedStatus
                          ? normalizeDate(data?.updatedStatus)
                          : '-'}
                      </b>
                    </li>
                  </>
                )}
                <li className='text-slate-600'>
                  Estatus actual:
                  <b> {translationsOrder[data!.status]}</b>
                </li>
                {data.status === EStatusOrder.Decline && (
                  <li className='text-slate-600'>
                    Razón de rechazo:
                    <b> {data?.reason || '-'}</b>
                  </li>
                )}
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
                        <td className='py-2 px-4 border-b'>
                          {product.product.name}
                        </td>
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
                            {normalizeAmounts(
                              product.salePrice * product.quantity
                            )}
                          </b>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <div className='flex justify-end mt-4 px-11'>
                  <h4 className='text-slate-600'>Total: </h4>
                  <h4 className='ml-2'>
                    <b>{normalizeAmounts(total)}</b>
                  </h4>
                </div>
              </div>
              {data?.status === EStatusOrder.Pending && !isClient && (
                <>
                  <div className='flex justify-center gap-4 mt-4'>
                    <button
                      onClick={() =>
                        mutate({
                          orderId: data!.id,
                          status: EStatusOrder.Approve,
                          reason: '',
                        })
                      }
                      className={primaryBtn}
                    >
                      Aprobar
                    </button>
                    <button
                      onClick={() => setIsDeclining(true)}
                      className={`${primaryBtn} bg-red-600 hover:bg-red-700 text-white`}
                    >
                      Rechazar
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </Dialog>
      <Dialog
        open={!!data && isDeclining}
        onClose={() => setIsDeclining(false)}
        maxWidth='xs'
        fullWidth={true}
      >
        <div className='p-4'>
          <div className='flex justify-between'>
            <h4 className='text-slate-700 font-bold text-lg'>
              Razón de rechazo
            </h4>
            <button onClick={() => setIsDeclining(false)}>
              <XCircleIcon className='w-7' />
            </button>
          </div>
          <form onSubmit={handleSubmit} className='mt-4'>
            <textarea
              id='reason'
              className='w-full p-2 border rounded-md resize-none h-32'
              placeholder='Escribe aqui...'
              name='reason'
            ></textarea>
            <div className='text-center mt-4'>
              <button className={primaryBtn}>Enviar</button>
            </div>
          </form>
        </div>
      </Dialog>
    </>
  );
}
