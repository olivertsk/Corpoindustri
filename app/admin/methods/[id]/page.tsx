'use client';
import { useParams } from 'next/navigation';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useQuery } from '@tanstack/react-query';
import { getMethod } from '@/src/api/MethodApi';
import EditMethodWrapper from '@/src/components/admin/methods/EditMethodWrapper';

export default function EditMapPage() {
  useBreadcrumb('Métodos de Pago', 'Editar Método de Pago');
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['method', id],
    queryFn: () => getMethod(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data) return <EditMethodWrapper method={data} />;
}
