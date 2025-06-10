import { ETypePaymentMethods, PaymentMethod } from './method';
import { Product } from './product';
import { User } from './user';

export enum EStatusOrder {
  Pending = 'pending',
  Approve = 'approve',
  Decline = 'decline',
}

export const translationsOrder = {
  [EStatusOrder.Pending]: 'Pendiente',
  [EStatusOrder.Approve]: 'Aprobado',
  [EStatusOrder.Decline]: 'Declinado',
};

export const translationsOrderColor = {
  [EStatusOrder.Pending]: '#eab308',
  [EStatusOrder.Approve]: '#22c55e',
  [EStatusOrder.Decline]: '#ef4444',
};

export type Order = {
  id: string;
  userId: User['id'];
  user?: User;
  dni: User['dni'];
  dniType: string;
  code: number;
  observation?: string;
  reason?: string;
  admin?: User;
  updatedStatus?: string;
  nameClient: string;
  phoneNumber: string;
  status: EStatusOrder;
  date: string;
  amount: number;
  amountWithoutTax: number;
  valueTax: number;
  location?: string;
  products: DataOrderProduct[];

  typePayment?: ETypePaymentMethods;
  method?: PaymentMethod;
  paymentMethodId?: PaymentMethod['id'];
  reference?: string;
};

export type DataOrderProduct = {
  productId: Product['id'];
  product: Product;
  code: Product['code'];
  valueTax: Product['taxRate'];
  salePrice: number;
  quantity: number;
  subtotalTax: number;
  subtotal: number;
};
