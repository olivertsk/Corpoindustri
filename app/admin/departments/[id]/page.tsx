'use client';

import { getDepartment } from '@/src/api/DepartmentsApi';
import EditDepartmentWrapper from '@/src/components/admin/departments/EditDepartmentWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

export default function EditDepartment() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['department', id],
    queryFn: () => getDepartment(id),
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (data) return <EditDepartmentWrapper department={data} />;
}
