import { getMethods } from '@/src/api/MethodApi';
import { ETypePaymentMethods, PaymentMethod } from '@/src/types/method';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import { inputStlyes } from '@/src/lib/global';
import MethodOption from './MethodOption';
import { useCartStore } from '@/src/store/cartSlice';
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  DevicePhoneMobileIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

const paymentTypeOptions = [
  {
    type: ETypePaymentMethods.Zelle,
    label: 'Zelle',
    Icon: WalletIcon,
  },
  {
    type: ETypePaymentMethods.Bank,
    label: 'Banco / Transferencia',
    Icon: BuildingLibraryIcon,
  },
  {
    type: ETypePaymentMethods.Cash,
    label: 'Efectivo',
    Icon: BanknotesIcon,
  },
  {
    type: ETypePaymentMethods.PagoMovil,
    label: 'Pago Movil',
    Icon: DevicePhoneMobileIcon,
  },
];

export default function SelectPaymentMethod() {
  const [typePayment, setTypePayment] = useState<ETypePaymentMethods>(
    ETypePaymentMethods.Zelle,
  );
  const [loading, setLoading] = useState(false);
  const [methods, setMethods] = useState<PaymentMethod[]>([]);
  const setSelectedMethod = useCartStore((state) => state.setSelectedMethod);

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

  const handleSetTypePayment = (type: ETypePaymentMethods) => {
    setTypePayment(type);
    setSelectedMethod(undefined);
  };

  return (
    <div>
      <p className='text-slate-700 font-bold text-lg my-4'>
        Selecciona el método de pago
      </p>
      <div className='flex flex-wrap gap-3'>
        {paymentTypeOptions.map(({ type, label, Icon }) => {
          const isActive = typePayment === type;

          return (
            <label
              key={type}
              htmlFor={type}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <input
                type='radio'
                name='typePayment'
                id={type}
                value={type}
                checked={isActive}
                onChange={() => handleSetTypePayment(type)}
                className='sr-only'
              />
              <Icon className='h-4 w-4' />
              {label}
            </label>
          );
        })}
      </div>
      {loading ? (
        <Spinner />
      ) : !methods.length && !loading ? (
        <p className='mt-4 text-red-600 mb-8'>
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
