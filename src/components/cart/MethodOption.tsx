import { apiUrl } from '@/src/lib/global';
import { useCartStore } from '@/src/store/cartSlice';
import { PaymentMethod } from '@/src/types/method';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { toast } from 'react-toastify';

type MethodOptionProps = {
  method: PaymentMethod;
  isAdmin?: boolean;
};
export default function MethodOption({
  method,
  isAdmin = false,
}: MethodOptionProps) {
  console.log('method :>> ', method);
  const setSelectedMethod = useCartStore((state) => state.setSelectedMethod);
  const copyText = (text?: string) => {
    navigator.clipboard.writeText(text || '');
    toast.success('Texto copiado al portapapeles');
  };

  return (
    <label
      className={`flex items-center gap-2 p-4 border cursor-pointer hover:bg-gray-100 transition-colors rounded-md mb-3 ${
        isAdmin && 'pointer-events-none'
      }`}
      htmlFor={method.id}
    >
      {!isAdmin && (
        <input
          type='radio'
          name='paymentMethodId'
          id={method.id}
          value={method.id}
          onChange={() => setSelectedMethod(method)}
        />
      )}
      <div className='flex flex-col break-all gap-1'>
        <span className='font-bold text-sm'>{method.name}</span>
        {method.dni && (
          <div className='flex items-center lg:gap-2 flex-wrap'>
            <span className='text-slate-600 text-sm'>Cédula de Identidad:</span>
            <div className='flex gap-4 items-center'>
              <span className='text-slate-600 text-sm'>
                <b> {method.dni}</b>
              </span>
              <button
                onClick={() => copyText(method.dni)}
                type='button'
                className='border rounded-full text-xs p-1 px-2 flex items-center justify-center hover:bg-gray-300'
              >
                <DocumentDuplicateIcon className='w-4' />
                Copiar
              </button>
            </div>
          </div>
        )}
        {method.numberAccount && (
          <div className='flex items-center lg:gap-2 flex-wrap'>
            <span className='text-slate-600 text-sm'>Número de cuenta:</span>
            <div className='flex gap-4 items-center'>
              <span className='text-slate-600 text-sm'>
                <b> {method.numberAccount}</b>
              </span>
              <button
                onClick={() => copyText(method.numberAccount)}
                type='button'
                className='border rounded-full text-xs p-1 px-2 flex items-center justify-center hover:bg-gray-300'
              >
                <DocumentDuplicateIcon className='w-4' />
                Copiar
              </button>
            </div>
          </div>
        )}
        {method.phoneNumber && (
          <div className='flex items-center lg:gap-2 flex-wrap'>
            <span className='text-slate-600 text-sm'>Número de teléfono:</span>
            <div className='flex gap-4 items-center'>
              <span className='text-slate-600 text-sm'>
                <b> {method.phoneNumber}</b>
              </span>
              <button
                onClick={() => copyText(method.phoneNumber)}
                type='button'
                className='border rounded-full text-xs p-1 px-2 flex items-center justify-center hover:bg-gray-300'
              >
                <DocumentDuplicateIcon className='w-4' />
                Copiar
              </button>
            </div>
          </div>
        )}
        {method.accountType && (
          <span className='text-slate-600 text-sm'>
            Tipo de Cuenta: <b> {method.accountType}</b>
          </span>
        )}
        {method.email && (
          <div className='flex items-center lg:gap-2 flex-wrap'>
            <span className='text-slate-600 text-sm'>Correo Electrónico:</span>
            <div className='flex gap-4 items-center'>
              <span className='text-slate-600 text-sm'>
                <b> {method.email}</b>
              </span>
              <button
                onClick={() => copyText(method.email)}
                type='button'
                className='border rounded-full text-xs p-1 px-2 flex items-center justify-center hover:bg-gray-300'
              >
                <DocumentDuplicateIcon className='w-4' />
                Copiar
              </button>
            </div>
          </div>
        )}
        {method.imageInfo && (
          <div className='w-full aspect-square relative'>
            <Image
              src={`${apiUrl}/file/${method.imageInfo}`}
              objectFit='contain'
              fill
              alt={method.name}
              loading='lazy'
            />
          </div>
        )}
      </div>
    </label>
  );
}
