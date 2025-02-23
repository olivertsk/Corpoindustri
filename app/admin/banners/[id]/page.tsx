'use client';
import { getBannerById } from '@/src/api/BannerApi';
import EditBannerWrapper from '@/src/components/admin/banners/EditBannerWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { IBanner } from '@/src/types/banner';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditBannerPage() {
  useBreadcrumb('Banners', 'Editar Banner');

  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<IBanner | null>(null);

  useEffect(() => {
    getBannerById(id).then((item) => setData(item));
  }, []);

  if (!data) return <Spinner />;

  if (data) return <EditBannerWrapper banner={data} />;
}
