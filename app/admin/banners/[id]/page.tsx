'use client';
import { getBannerById } from '@/src/api/BannerApi';
import EditBannerWrapper from '@/src/components/admin/banners/EditBannerWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { IBanner } from '@/src/types/banner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EditBannerPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery<IBanner>({
    queryKey: ['banner', id],
    queryFn: () => getBannerById(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner />;

  if (data) return <EditBannerWrapper banner={data} />;
}
