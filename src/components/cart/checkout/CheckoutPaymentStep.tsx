import SelectPaymentMethod from '@/src/components/cart/SelectPaymentMethod';
import Spinner from '@/src/components/spinner/Spinner';
import { primaryBtn } from '@/src/lib/global';

type CheckoutPaymentStepProps = {
  showUsdAmount: boolean;
  showBsAmount: boolean;
  amountUsd: string;
  amountBs: string;
  selectedMethod: boolean;
  sending: boolean;
  onBack: () => void;
};

export default function CheckoutPaymentStep({
  showUsdAmount,
  showBsAmount,
  amountUsd,
  amountBs,
  selectedMethod,
  sending,
  onBack,
}: CheckoutPaymentStepProps) {
  return (
    <div>
      <h3 className='text-xl font-bold text-slate-800'>Pago y confirmacion</h3>
      <p className='text-slate-600 mt-1 mb-6'>
        Elige tu metodo de pago y confirma el monto para finalizar tu pedido.
      </p>

      <SelectPaymentMethod />

      {showUsdAmount && (
        <p className='text-slate-700 font-bold text-lg my-4'>
          Monto a pagar (USD): <b>{amountUsd}</b>
        </p>
      )}

      {showBsAmount && (
        <p className='text-slate-700 font-bold text-lg my-4'>
          Monto a pagar (BS): <b>{amountBs}</b>
        </p>
      )}

      <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
        <button
          type='button'
          onClick={onBack}
          className='rounded-full border border-slate-300 px-6 py-2 font-semibold text-slate-700 hover:bg-slate-100 transition-colors'
          disabled={sending}
        >
          Volver
        </button>

        {sending ? (
          <Spinner />
        ) : (
          <button
            disabled={!selectedMethod}
            type='submit'
            className={`${primaryBtn} disabled:bg-gray-500 disabled:text-gray-300`}
          >
            Solicitud de Compra
          </button>
        )}
      </div>
    </div>
  );
}
