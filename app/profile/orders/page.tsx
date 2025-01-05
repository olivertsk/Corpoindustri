'use client';

import OrderTable from '@/src/components/orders/OrderTable';

export default function ClientOrders() {
  return (
    <div className='max-w-7xl mx-auto my-8 p-4 lg:p-0 overflow-auto'>
      <OrderTable isClient={true} />
    </div>
  );
}
