import { PaymentMethod } from '@/src/types/method';

type MethodOptionProps = {
  method: PaymentMethod;
  isAdmin?: boolean;
};
export default function MethodOption({
  method,
  isAdmin = false,
}: MethodOptionProps) {
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
        />
      )}
      <div className='flex flex-col'>
        <span className='font-bold text-sm'>{method.name}</span>
        {method.dni && (
          <span className='text-slate-600 text-sm'>
            Cédula de Identidad: <b>{method.dni}</b>
          </span>
        )}
        {method.numberAccount && (
          <span className='text-slate-600 text-sm'>
            Número de cuenta: <b>{method.numberAccount}</b>
          </span>
        )}
        {method.phoneNumber && (
          <span className='text-slate-600 text-sm'>
            Número de teléfono: <b> {method.phoneNumber}</b>
          </span>
        )}
        {method.accountType && (
          <span className='text-slate-600 text-sm'>
            Tipo de Cuenta: <b> {method.accountType}</b>
          </span>
        )}
        {method.email && (
          <span className='text-slate-600 text-sm'>
            Correo Electrónico: <b> {method.email}</b>
          </span>
        )}
      </div>
    </label>
  );
}
