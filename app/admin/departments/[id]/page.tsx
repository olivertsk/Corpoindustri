'use client';

import { getDepartment } from '@/src/api/DepartmentsApi';
import EditDepartmentWrapper from '@/src/components/admin/departments/EditDepartmentWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { Department } from '@/src/types/department';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditDepartment() {
  useBreadcrumb('Departamentos', 'Editar Departamento');
  const { id } = useParams<{ id: string }>();

  const [data, setData] = useState<Department | null>(null);

  useEffect(() => {
    getDepartment(id).then((product) => setData(product));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  if (data) return <EditDepartmentWrapper department={data} />;
}
