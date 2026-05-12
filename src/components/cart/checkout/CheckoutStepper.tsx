'use client';

import { createOrder } from '@/src/api/OrderApi';
import { getClientSurvey } from '@/src/api/SurveyApi';
import { uploadFile } from '@/src/api/FileApi';
import { useCalcAmount } from '@/src/hooks/useCalcAmount';
import { primaryBtn } from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { useCartStore } from '@/src/store/cartSlice';
import { useMultiCoinStore } from '@/src/store/multicoinStore';
import { DataOrderProduct, Order } from '@/src/types/order';
import { ESurveyType, TSurvey } from '@/src/types/survey';
import { FormEvent, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import SurveyWrapper from '../../survey/SurveyWrapper';
import CheckoutCustomerStep, {
  CustomerFormValues,
} from './CheckoutCustomerStep';
import CheckoutPaymentStep from './CheckoutPaymentStep';
import CheckoutStepperHeader from './CheckoutStepperHeader';

type CheckoutStepperProps = {
  onCancel: () => void;
};

const steps = ['Datos', 'Pago'];

export default function CheckoutStepper({ onCancel }: CheckoutStepperProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const user = useAuthStore((store) => store.user);
  const orderProducts = useCartStore((state) => state.orderProducts);
  const clearCart = useCartStore((state) => state.clearCart);
  const selectedMethod = useCartStore((state) => state.selectedMethod);
  const setSelectedMethod = useCartStore((state) => state.setSelectedMethod);
  const currencies = useMultiCoinStore((state) => state.currencies);
  const { choosePrice, currentCoin, validateNormalizeAmount } = useCalcAmount();

  const [currentStep, setCurrentStep] = useState(1);
  const [sending, setSending] = useState(false);
  const [surveyId, setSurveyId] = useState<TSurvey['id']>(undefined);
  const [customerValues, setCustomerValues] = useState<CustomerFormValues>({
    nameClient: user?.name
      ? `${user.name || ''} ${user.lastName || ''}`.trim()
      : '',
    phoneNumber: user?.phoneNumber || '',
    dniType: user?.dniType || 'V',
    dni: user?.dni,
    observation: '',
    location: user?.location || '',
  });

  const totalBs = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) =>
          (init +=
            item.quantity *
            choosePrice(
              item,
              currentCoin.value === 'USD' ? true : false,
              'BS',
            )),
        0,
      ),
    [orderProducts, choosePrice, currentCoin],
  );

  const total = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) =>
          (init += item.quantity * choosePrice(item, false, 'USD')),
        0,
      ),
    [orderProducts, choosePrice],
  );

  const originalTotal = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) => (init += item.quantity * choosePrice(item, false)),
        0,
      ),
    [orderProducts, choosePrice],
  );

  const totalWithoutTax = useMemo(
    () =>
      orderProducts.reduce(
        (init, item) => (init += item.quantity * choosePrice(item, false)),
        0,
      ),
    [orderProducts, choosePrice],
  );

  const totalTax = useMemo(
    () => orderProducts.reduce((init, item) => (init += item.taxRate || 0), 0),
    [orderProducts],
  );

  const parsedOrderProducts: DataOrderProduct[] = useMemo(
    () =>
      orderProducts.map((product) => ({
        productId: product.id,
        code: product.code,
        valueTax: product.taxRate,
        salePrice: choosePrice(product),
        quantity: product.quantity,
        subtotalTax: (product.taxRate || 0) * product.quantity,
        subtotal: choosePrice(product) * product.quantity,
      })),
    [orderProducts, choosePrice],
  );

  const setField = (field: keyof CustomerFormValues, value: string) => {
    setCustomerValues((prev) => ({ ...prev, [field]: value }));
  };

  const validateCustomerStep = () => {
    if (!customerValues.nameClient.trim()) {
      toast.error('Verifica que el nombre este lleno');
      return false;
    }

    if (!customerValues.phoneNumber.trim()) {
      toast.error('Verifica que el numero de telefono este lleno');
      return false;
    }

    if (!customerValues.dni) {
      toast.error('Verifica que la cedula este llena');
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (!validateCustomerStep()) {
      return;
    }
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleCancel = () => {
    setSelectedMethod(undefined);
    onCancel();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formRef.current) {
      return;
    }

    if (!validateCustomerStep()) {
      setCurrentStep(1);
      return;
    }

    if (!selectedMethod) {
      toast.error('Tienes que seleccionar una opcion de pago');
      return;
    }

    const formData = new FormData(formRef.current);

    try {
      const payload: Order = {} as Order;

      payload['userId'] = user?.id as string;
      payload['products'] = parsedOrderProducts;
      payload['amountWithoutTax'] = totalWithoutTax;
      payload['valueTax'] = totalTax;
      payload['amount'] = originalTotal;
      payload['nameClient'] = customerValues.nameClient;
      payload['phoneNumber'] = customerValues.phoneNumber;
      payload['dniType'] = customerValues.dniType;
      payload['dni'] = customerValues.dni;
      payload['observation'] = customerValues.observation;
      payload['location'] = customerValues.location;
      payload['date'] = new Date().toLocaleDateString();

      formData.forEach((value, key) => {
        if (key === 'paymentVoucher') {
          return;
        }

        if (key === 'products') {
          return;
        }

        payload[key as keyof Order] = value.toString() as never;
      });

      const paymentVoucher = formData.get('paymentVoucher');
      if (
        paymentVoucher &&
        paymentVoucher instanceof File &&
        paymentVoucher.size
      ) {
        const result = await uploadFile(paymentVoucher);
        payload['paymentVoucher'] = result?.fileName[0] || '';
      }

      setSending(true);
      const response = await createOrder({
        ...payload,
        paidWith: currentCoin.value,
        exchangeRate: currencies[0]?.exchangeRate || 1,
      });
      setSending(false);

      if (response.success) {
        toast.success(
          'Le enviaremos una notificacion cuando su pedido haya sido confirmado',
        );
        clearCart(currentCoin);
        setSelectedMethod(undefined);
        setCurrentStep(1);
        const clientSurveyId = await getClientSurvey(ESurveyType.FIRSTPURCHASE);
        setSurveyId(clientSurveyId);
        return;
      }

      response.message.forEach((item: { field: string }) => {
        if (item.field === 'dni') {
          toast.error('La Cedula de Identidad es requerida');
        }
      });
    } catch {
      setSending(false);
      toast.error('No pudimos procesar la compra, intenta nuevamente.');
    }
  };

  return (
    <section className='w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8'>
      <SurveyWrapper surveyId={surveyId} setSurveyId={setSurveyId} />

      <div className='mb-4 flex items-center justify-between gap-3'>
        <div>
          <h2 className='text-2xl font-bold text-slate-800'>
            Finaliza tu compra
          </h2>
          <p className='text-slate-600'>
            Sigue los pasos para completar tu pedido de forma segura.
          </p>
        </div>
        <button
          type='button'
          onClick={handleCancel}
          className='rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors'
        >
          Cancelar
        </button>
      </div>

      <div className='mb-6 rounded-xl border border-slate-200 bg-slate-50 p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h4 className='text-base font-bold text-slate-800'>
            Resumen de productos
          </h4>
          <span className='text-sm font-semibold text-slate-600'>
            {orderProducts.length} items
          </span>
        </div>
        <ul className='space-y-2'>
          {orderProducts.map((product) => (
            <li
              key={product.id}
              className='flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-3 py-2'
            >
              <div className='min-w-0'>
                <p className='truncate text-sm font-semibold text-slate-800'>
                  {product.name}
                </p>
                <p className='text-xs text-slate-500'>
                  Cantidad: {product.quantity}
                </p>
              </div>
              <p className='text-sm font-bold text-slate-700'>
                {validateNormalizeAmount(
                  undefined,
                  choosePrice(product) * product.quantity,
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <CheckoutStepperHeader steps={steps} currentStep={currentStep} />

      <form ref={formRef} onSubmit={handleSubmit}>
        <input type='hidden' name='userId' value={user?.id || ''} />
        <input
          type='hidden'
          name='products'
          value={JSON.stringify(parsedOrderProducts)}
        />
        <input type='hidden' name='amountWithoutTax' value={totalWithoutTax} />
        <input type='hidden' name='valueTax' value={totalTax} />
        <input type='hidden' name='amount' value={originalTotal} />

        {currentStep === 1 && (
          <>
            <CheckoutCustomerStep values={customerValues} onChange={setField} />

            <div className='mt-8 flex justify-end'>
              <button
                type='button'
                className={`${primaryBtn} !rounded-full`}
                onClick={handleNext}
              >
                Continuar al pago
              </button>
            </div>
          </>
        )}

        {currentStep === 2 && (
          <CheckoutPaymentStep
            showUsdAmount={selectedMethod?.currency?.includes('USD') || false}
            showBsAmount={selectedMethod?.currency?.includes('BS') || false}
            amountUsd={validateNormalizeAmount(undefined, total, 'any', 'USD')}
            amountBs={validateNormalizeAmount(undefined, totalBs, 'any', 'BS')}
            selectedMethod={Boolean(selectedMethod)}
            sending={sending}
            onBack={handleBack}
          />
        )}
      </form>
    </section>
  );
}
