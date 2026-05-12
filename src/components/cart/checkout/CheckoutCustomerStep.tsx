import { inputStlyes } from '@/src/lib/global';
import { User } from '@/src/types/user';

type CustomerFormValues = {
  nameClient: string;
  phoneNumber: string;
  dniType: string;
  dni: User['dni'];
  observation: string;
  location: string;
};

type CheckoutCustomerStepProps = {
  values: CustomerFormValues;
  onChange: (field: keyof CustomerFormValues, value: string) => void;
};

export type { CustomerFormValues };

export default function CheckoutCustomerStep({
  values,
  onChange,
}: CheckoutCustomerStepProps) {
  return (
    <div>
      <h3 className='text-xl font-bold text-slate-800'>Datos del cliente</h3>
      <p className='text-slate-600 mt-1 mb-6'>
        Completa tu información para procesar la orden de repuestos.
      </p>

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
          value={values.nameClient}
          onChange={(e) => onChange('nameClient', e.target.value)}
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='phoneNumber'
          className='block text-sm font-medium text-gray-700'
        >
          Numero de telefono
        </label>
        <input
          type='text'
          name='phoneNumber'
          id='phoneNumber'
          className={inputStlyes}
          value={values.phoneNumber}
          onChange={(e) => onChange('phoneNumber', e.target.value)}
          required
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='dni'
          className='block text-sm font-medium text-gray-700'
        >
          Cedula
        </label>
        <div className='flex gap-2'>
          <select
            className={`${inputStlyes} !w-fit`}
            value={values.dniType}
            name='dniType'
            onChange={(e) => onChange('dniType', e.target.value)}
            required
          >
            <option value='V'>V</option>
            <option value='E'>E</option>
            <option value='J'>J</option>
          </select>
          <input
            value={values.dni}
            onChange={(e) => onChange('dni', e.target.value)}
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
          Observacion
        </label>
        <textarea
          name='observation'
          id='observation'
          className={`${inputStlyes} resize-none min-h-28`}
          value={values.observation}
          onChange={(e) => onChange('observation', e.target.value)}
        />
      </div>

      <div className='mb-4'>
        <label
          htmlFor='location'
          className='block text-sm font-medium text-gray-700'
        >
          Ubicacion
        </label>
        <textarea
          name='location'
          id='location'
          className={`${inputStlyes} resize-none min-h-28`}
          value={values.location}
          onChange={(e) => onChange('location', e.target.value)}
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
          value={new Date().toLocaleDateString()}
        />
      </div>
    </div>
  );
}
