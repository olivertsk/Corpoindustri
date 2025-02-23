'use client';
import { useParams } from 'next/navigation';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { getMethod } from '@/src/api/MethodApi';
import EditMethodWrapper from '@/src/components/admin/methods/EditMethodWrapper';
import { useEffect, useState } from 'react';
import { PaymentMethodForm } from '@/src/types/method';

export default function EditMapPage() {
  useBreadcrumb('Métodos de Pago', 'Editar Método de Pago');
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<PaymentMethodForm | null>(null);
  useEffect(() => {
    getMethod(id).then((product) => setData(product));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditMethodWrapper method={data} />;
}
