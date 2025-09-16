import { createOrder } from '@/src/api/OrderApi';
import { inputStlyes, primaryBtn } from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { useCartStore } from '@/src/store/cartSlice';
import { Order } from '@/src/types/order';
import { Dialog } from '@mui/material';
import { Dispatch, SetStateAction, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SelectPaymentMethod from './SelectPaymentMethod';
import { getClientSurvey } from '@/src/api/SurveyApi';
import { ESurveyType, TSurvey } from '@/src/types/survey';
import SurveyWrapper from '../survey/SurveyWrapper';
import { uploadFile } from '@/src/api/FileApi';
import { useMultiCoinStore } from '@/src/store/multicoinStore';
import {
  amountByCoin,
  validateNormalizeAmount,
} from '@/src/utils/normalizeAmounts';
import Spinner from '../spinner/Spinner';

type ContinuePaymentProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
};

export default function ContinuePayment({
  open,
  setOpen,
}: ContinuePaymentProps) {
  const orderProducts = useCartStore((state) => state.orderProducts);
  const clearCart = useCartStore((state) => state.clearCart);
  const user = useAuthStore((store) => store.user);
  const selectedCoin = useMultiCoinStore((store) => store.selectedCoin);
  const [sending, setSending] = useState(false);

  const total = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) =>
          (init += item.quantity * amountByCoin(selectedCoin, item)),
        0
      ),
    [orderProducts, selectedCoin]
  );

  const totalWithoutTax = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) =>
          (init +=
            item.quantity *
            (selectedCoin.value === 'USD'
              ? item.promotionalPrice || item.price
              : item.promotionalPriceBs || item.priceBs)),
        0
      ),
    [orderProducts, selectedCoin]
  );

  const totalTax = useMemo(
    () => orderProducts.reduce((init, item) => (init += item.taxRate || 0), 0),
    [orderProducts]
  );

  const parsedOrderProducts = useMemo(
    () =>
      orderProducts.map((product) => ({
        productId: product.id,
        code: product.code,
        valueTax: product.taxRate,
        salePrice: amountByCoin(selectedCoin, product),
        quantity: product.quantity,
        subtotalTax: (product.taxRate || 0) * product.quantity,
        subtotal: amountByCoin(selectedCoin, product) * product.quantity,
      })),
    [orderProducts]
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [surveyId, setSurveyId] = useState<TSurvey['id']>(undefined);

  const paymentAction = async (formData: FormData) => {
    try {
      const payload: Order = {} as Order;

      formData.forEach((value, key) => {
        if (key === 'products') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (payload as Record<string, any>)[key] = JSON.parse(value.toString());
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (payload as Record<string, any>)[key] = value.toString();
        }
      });

      const nameClient = formData.get('nameClient');
      const phoneNumber = formData.get('phoneNumber');
      const dni = formData.get('dni');

      if (!nameClient) {
        toast.error('Verifica que el nombre esté lleno');
        throw new Error('');
      }

      if (!phoneNumber) {
        toast.error('Verifica que el número de teléfono esté lleno');
        throw new Error('');
      }

      if (!dni) {
        toast.error('Verifica que la cédula esté llena');
        throw new Error('');
      }

      if (!formData.get('paymentMethodId')) {
        toast.error('Tienes que seleccionar una opción de pago');
        throw new Error('');
      }

      const paymentVoucher = formData.get('paymentVoucher');
      if (paymentVoucher) {
        const result = await uploadFile(paymentVoucher as File);
        payload['paymentVoucher'] = result?.fileName[0] || '';
      }

      setSending(true);
      const response = await createOrder({
        ...payload,
        paidWith: selectedCoin.value,
      });
      setSending(false);
      if (response.success) {
        setOpen(false);
        toast.success(
          'Le enviaremos una notificacion cuando su pedido haya sido confirmado'
        );
        clearCart(selectedCoin);
        const surveyId = await getClientSurvey(ESurveyType.FIRSTPURCHASE);
        setSurveyId(surveyId);
        return;
      }
      if (!response.success) {
        response.message.forEach((item: { field: string }) => {
          if (item.field === 'dni') {
            toast.error('La Cédula de Identidad es requerida');
          }
        });
      }
    } catch {
      setTimeout(() => {
        for (const [key, value] of formData.entries()) {
          if (key === 'typePayment') {
            const input = formRef.current!.querySelector(
              `[value="${value}"]`
            ) as HTMLInputElement;
            if (input) {
              input.checked = true; // Populate the field
            }
          } else {
            const input = formRef.current!.querySelector(
              `[name="${key}"]`
            ) as HTMLInputElement;
            if (input) {
              if (key !== 'paymentVoucher') input.value = value as string; // Populate the field
            }
          }
        }
      }, 200);
    }
  };

  return (
    <>
      <SurveyWrapper surveyId={surveyId} setSurveyId={setSurveyId} />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='sm'
        fullWidth={true}
      >
        <div className='p-8'>
          <button
            className='absolute top-2 right-2'
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
            >
              <path
                fill='currentColor'
                d='M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z'
              />
            </svg>
          </button>
          <h2 className='text-2xl font-bold text-center mb-2 text-slate-800'>
            Estás a un paso de finalizar tu compra
          </h2>
          <p className='text-center'>
            Llena el siguiente formulario para continuar con el proceso de pago
          </p>
          <form ref={formRef} action={paymentAction} className='mt-4'>
            <input type='hidden' name='userId' value={user?.id} />
            <input
              type='hidden'
              name='products'
              value={JSON.stringify(parsedOrderProducts)}
            />
            <input
              type='hidden'
              name='amountWithoutTax'
              value={totalWithoutTax}
            />
            <input type='hidden' name='valueTax' value={totalTax} />
            <div className='mb-4'>
              <label
                htmlFor='nameClient'
                className='block text-sm font-medium text-gray-700'
              >
                Nombre del Cliente
              </label>
              <input
                type='text'
                name='nameClient'
                id='nameClient'
                className={inputStlyes}
                defaultValue={
                  user?.name
                    ? (user?.name || '') + ' ' + (user?.lastName || '')
                    : ''
                }
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='phoneNumber'
                className='block text-sm font-medium text-gray-700'
              >
                Número de teléfono
              </label>
              <input
                type='text'
                name='phoneNumber'
                id='phoneNumber'
                className={inputStlyes}
                defaultValue={user?.phoneNumber}
                required
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='dni'
                className='block text-sm font-medium text-gray-700'
              >
                Cédula
              </label>
              <div className='flex gap-2'>
                <select
                  className={`${inputStlyes} !w-fit`}
                  defaultValue={user?.dniType}
                  name='dniType'
                  required
                >
                  <option value='V'>V</option>
                  <option value='E'>E</option>
                  <option value='J'>J</option>
                </select>
                <input
                  defaultValue={user?.dni}
                  type='number'
                  className={inputStlyes}
                  id='dni'
                  name='dni'
                  required
                />
              </div>
            </div>
            <div className='mb-4'>
              <label
                htmlFor='observation'
                className='block text-sm font-medium text-gray-700'
              >
                Observación
              </label>
              <textarea
                name='observation'
                id='observation'
                className={`${inputStlyes} resize-none min-h-32`}
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='location'
                className='block text-sm font-medium text-gray-700'
              >
                Ubicación
              </label>
              <textarea
                name='location'
                id='location'
                className={`${inputStlyes} resize-none min-h-32`}
                defaultValue={user?.location}
              />
            </div>

            <div className='mb-4'>
              <label
                htmlFor='date'
                className='block text-sm font-medium text-gray-700'
              >
                Fecha
              </label>
              <input
                readOnly
                type='text'
                name='date'
                id='date'
                className={`${inputStlyes} read-only:bg-gray-200`}
                defaultValue={new Date().toLocaleDateString()}
              />
            </div>

            <input type='hidden' name='amount' defaultValue={total} />
            <SelectPaymentMethod />
            <p className='text-slate-700 font-bold text-lg my-4'>
              Monto a pagar:{' '}
              <b>{validateNormalizeAmount(selectedCoin, undefined, total)}</b>
            </p>
            {sending ? (
              <Spinner />
            ) : (
              <button type='submit' className={`${primaryBtn} w-full`}>
                Solicitud de Compra
              </button>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
}
