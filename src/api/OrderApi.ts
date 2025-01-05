import { makeGet, makePost } from '../config/fetch';
import { Meta } from '../types';
import { Order } from '../types/order';

export type OrderParams = {
  pag: number;
  isClient: boolean;
};

export const createOrder = async (order: Order) => {
  try {
    return await makePost(`/orders/create`, order, 'POST');
  } catch (error) {
    throw error;
  }
};

type AllOrders = {
  meta: Meta;
  data: Order[];
};

export const getOrders = async (params: OrderParams): Promise<AllOrders> => {
  try {
    return await makeGet(`/orders/all`, params);
  } catch (error) {
    throw error;
  }
};

export const getOrder = async (
  orderId: Order['id']
): Promise<Order | undefined> => {
  try {
    return await makeGet(`/orders/show/${orderId}`);
  } catch (error) {
    throw error;
  }
};

export const updateOrderStatus = async ({
  orderId,
  status,
  reason,
}: {
  orderId: Order['id'];
  status: Order['status'];
  reason: string;
}) => {
  try {
    return await makePost(
      `/orders/updateStatus/${orderId}`,
      { status, reason },
      'PUT'
    );
  } catch (error) {
    throw error;
  }
};
