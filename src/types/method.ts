export enum ETypePaymentMethods {
  Cash = 'cash',
  Bank = 'bank',
  Zelle = 'zelle',
  PagoMovil = 'pago movil',
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
  status: boolean | true;
};

export type PaymentMethodForm = Omit<PaymentMethod, 'id'>;
