'use client';
import { useParams } from 'next/navigation';
import { getMap } from '@/src/api/MapApi ';
import EditMapWrapper from '@/src/components/admin/maps/EditMapWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useEffect, useState } from 'react';
import { TMap } from '@/src/types/map';

export default function EditMapPage() {
  useBreadcrumb('Ubicaciones', 'Editar Ubicación');
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<TMap | null>(null);

  useEffect(() => {
    getMap(id).then((product) => setData(product));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditMapWrapper map={data} />;
}
