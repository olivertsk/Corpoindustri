'use client';

import { getCategory } from '@/src/api/CategoriesApi';
import EditCategoryWrapper from '@/src/components/admin/categories/EditCategoryWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { ICategory } from '@/src/types/category';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditDepartment() {
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<ICategory | null>(null);

  useEffect(() => {
    getCategory(id).then((item) => setData(item));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditCategoryWrapper category={data} />;
}
