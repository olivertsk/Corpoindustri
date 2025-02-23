'use client';
import { getProduct } from '@/src/api/ProductApi';
import EditProductFormWrapper from '@/src/components/admin/products/EditProductFormWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { Product } from '@/src/types/product';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditProductPage() {
  useBreadcrumb('Productos', 'Editar Producto');
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Product | null>(null);
  useEffect(() => {
    getProduct(id).then((product) => setData(product));
  }, []);

  console.log('product', data);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditProductFormWrapper product={data} />;
}
