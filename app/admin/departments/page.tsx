'use client';
import { deleteDepartment, getDepartments } from '@/src/api/DepartmentsApi';
import Spinner from '@/src/components/spinner/Spinner';
import TaskTable from '@/src/components/TaskTable';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import { Department, DepartmentFilters } from '@/src/types/department';
import { GridColDef, getGridBooleanOperators } from '@mui/x-data-grid';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';

export default function DepartmentPage() {
  const allColumns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nombre',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Estatus',
      flex: 1,
      minWidth: 150,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot'
      ),
    },
    {
      field: 'isSalient',
      headerName: 'Destacada',
      flex: 1,
      minWidth: 150,
      filterOperators: getGridBooleanOperators().filter(
        (op) => op.value === 'is' || op.value === 'isNot'
      ),
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`departments/${params.row.id}`}
            className={`${editBtn} h-[32px] flex items-center justify-center`}
          >
            Editar
          </Link>
          <button
            onClick={() => handleDeleteBtn(params.row.id)}
            className={`${deleteBtn} h-[32px] flex items-center justify-center`}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useBreadcrumb('Departamentos', 'Todos los departamentos');
  const [filters, setFilters] = useState<DepartmentFilters>({
    pag: 1,
    name: '',
    isSalient: '',
    limit: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteDepartment,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ['departments'] });
        toast.success('Departamento eliminado correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: Department['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar este departamento?')) {
        mutate(id);
      }
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  if (data)
    return (
      <section>
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2 flex-wrap'>
          <Link
            href='departments/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md'
          >
            Nuevo Departamento
          </Link>
        </div>
        <TaskTable<DepartmentFilters>
          rows={data.data.map((item) => ({
            id: item.id,
            name: item.name,
            status: item.status ? 'Activo' : 'Inactivo',
            isSalient: item.isSalient ? 'Si' : 'No',
          }))}
          columns={allColumns}
          rowCount={data.meta.total}
          isLoading={isLoading}
          page={data.meta.actualPage - 1}
          pageSize={filters.limit!}
          onRowClick={() => {}}
          setFilters={setFilters}
          filters={filters}
          queryClientKey='departments'
        />
      </section>
    );
}
