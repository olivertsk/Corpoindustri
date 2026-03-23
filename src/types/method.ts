export enum ETypePaymentMethods {
  Cash = 'cash',
  Bank = 'bank',
  Zelle = 'zelle',
  PagoMovil = 'pago movil',
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
  currency?: string;
  status: boolean | true;
};

export type PaymentMethodForm = Omit<PaymentMethod, 'id'>;
