export enum ETypePaymentMethods {
  Cash = 'cash',
  Bank = 'bank',
  Zelle = 'zelle',
  PagoMovil = 'pago movil',
  Binance = 'binance',
}

export enum EAvailableCurrency {
  USD = 'USD',
  BS = 'BS',
}

export const methodEnumTranslation = {
  [ETypePaymentMethods.Cash]: 'Efectivo',
  [ETypePaymentMethods.Bank]: 'Transferencia Bancaria',
  [ETypePaymentMethods.Zelle]: 'Zelle',
  [ETypePaymentMethods.PagoMovil]: 'Pago Móvil',
  [ETypePaymentMethods.Binance]: 'Binance',
};

export type PaymentMethod = {
  id: string;
  type: ETypePaymentMethods;
  name: string;
  dni?: string;
  email?: string;
  phoneNumber?: string;
  numberAccount?: string;
  accountType?: string;
  currency?: EAvailableCurrency;
  status: boolean | true;
  imageInfo?: string | null;
};

export type PaymentMethodForm = Omit<PaymentMethod, 'id'>;
