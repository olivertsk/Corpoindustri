'use client';

import { getCategory } from '@/src/api/CategoriesApi';
import EditCategoryWrapper from '@/src/components/admin/categories/EditCategoryWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EditDepartment() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getCategory(id),
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (isLoading) {
    return <Spinner />;
  }

  if (data) return <EditCategoryWrapper category={data} />;
}
