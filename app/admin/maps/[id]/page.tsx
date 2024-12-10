'use client';
import { useParams } from 'next/navigation';
import { getMap } from '@/src/api/MapApi ';
import EditMapWrapper from '@/src/components/admin/maps/EditMapWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useQuery } from '@tanstack/react-query';

export default function EditMapPage() {
  useBreadcrumb('Ubicaciones', 'Editar Ubicación');
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['map', id],
    queryFn: () => getMap(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data) return <EditMapWrapper map={data} />;
}
