import { getMethods } from '@/src/api/MethodApi';
import { ETypePaymentMethods, PaymentMethod } from '@/src/types/method';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { inputStlyes } from '@/src/lib/global';
import MethodOption from './MethodOption';

export default function SelectPaymentMethod() {
  const [typePayment, setTypePayment] = useState<ETypePaymentMethods>(
    ETypePaymentMethods.Zelle
  );
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getMethods({
        type: typePayment,
      });
      setMethods(response.data);
      setLoading(false);
    };
    fetchData();
  }, [typePayment]);

  return (
    <div>
      <p className='text-slate-700 font-bold text-lg my-4'>
        Selecciona el método de pago
      </p>
      <div className='flex flex-col gap-2'>
        <label
          htmlFor={ETypePaymentMethods.Zelle}
          className='flex items-center gap-2'
        >
          <input
            type='radio'
            name='typePayment'
            id={ETypePaymentMethods.Zelle}
            value={ETypePaymentMethods.Zelle}
            defaultChecked={true}
            onChange={() => setTypePayment(ETypePaymentMethods.Zelle)}
          />
          Zelle
        </label>
        <label
          htmlFor={ETypePaymentMethods.Bank}
          className='flex items-center gap-2'
        >
          <input
            type='radio'
            name='typePayment'
            id={ETypePaymentMethods.Bank}
            value={ETypePaymentMethods.Bank}
            onChange={() => setTypePayment(ETypePaymentMethods.Bank)}
          />
          Banco / Transferencia
        </label>
        <label
          htmlFor={ETypePaymentMethods.Cash}
          className='flex items-center gap-2'
        >
          <input
            type='radio'
            name='typePayment'
            id={ETypePaymentMethods.Cash}
            value={ETypePaymentMethods.Cash}
            onChange={() => setTypePayment(ETypePaymentMethods.Cash)}
          />
          Efectivo
        </label>
        <label
          htmlFor={ETypePaymentMethods.PagoMovil}
          className='flex items-center gap-2'
        >
          <input
            type='radio'
            name='typePayment'
            id={ETypePaymentMethods.PagoMovil}
            value={ETypePaymentMethods.PagoMovil}
            onChange={() => setTypePayment(ETypePaymentMethods.PagoMovil)}
          />
          Pago Móvil
        </label>
      </div>
      {loading ? (
        <Spinner />
      ) : !methods.length && !loading ? (
        <p className='mt-4 text-slate-600 text-xs mb-8'>
          No hay opciones creadas para este método de pago, por favor seleccione
          otro.
        </p>
      ) : (
        <div className='mt-4'>
          <p className='text-slate-700 font-bold text-lg my-4'>
            Selecciona una opción
          </p>
          {methods.map((method) => (
            <div key={method.id}>
              <MethodOption method={method} />
            </div>
          ))}
          {typePayment !== ETypePaymentMethods.Cash && (
            <>
              <div className='mb-4'>
                <label
                  htmlFor='reference'
                  className='block text-sm font-medium text-gray-700'
                >
                  Referencia
                </label>
                <input
                  type='text'
                  name='reference'
                  id='reference'
                  placeholder='Escribe la referencia de tu transacción'
                  className={inputStlyes}
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='paymentVoucher'
                  className='block text-sm font-medium text-gray-700'
                >
                  Comprobante de Pago
                </label>
                <input
                  type='file'
                  name='paymentVoucher'
                  id='paymentVoucher'
                  className={inputStlyes}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
