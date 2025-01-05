'use client';

import OrderTable from '@/src/components/orders/OrderTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

export default function OrdersPage() {
  useBreadcrumb('Ordenes', 'Todas las Ordenes');

  return <OrderTable isClient={false} />;
}
