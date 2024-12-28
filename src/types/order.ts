import { Product } from './product';
import { User } from './user';

export type Order = {
  id: string;
  userId: User['id'];
  dni: User['dni'];
  dniType: string;
  observation?: string;
  nameClient: string;
  phoneNumber: string;
  status: string;
  date: string;
  amount: number;
  amountWithoutTax: number;
  valueTax: number;
  location?: string;
  products: DataOrderProduct[];
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
