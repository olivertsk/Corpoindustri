'use client';
import { getProduct } from '@/src/api/ProductApi';
import EditProductFormWrapper from '@/src/components/admin/products/EditProductFormWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EditProductPage() {
  useBreadcrumb('Productos', 'Editar Producto');
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data) return <EditProductFormWrapper product={data} />;
}
