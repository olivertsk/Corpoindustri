import { deleteSurvey, getSurveys } from '@/src/api/SurveyApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { deleteBtn, editBtn } from '@/src/lib/global';
import {
  surveyTypeDictionary,
  TSurvey,
  TSurveyFilter,
} from '@/src/types/survey';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'react-toastify';
import TaskTable from '../../TaskTable';
import { GridColDef } from '@mui/x-data-grid';

const queryKey = 'survey';

export default function SurveyIndex() {
  const allColumns: GridColDef[] = [
    { field: 'title', flex: 1, minWidth: 150, headerName: 'Título' },
    { field: 'description', flex: 1, minWidth: 150, headerName: 'Descripción' },
    { field: 'type', flex: 1, minWidth: 150, headerName: 'Tipo' },
    {
      field: 'actions',
      headerName: 'Acciones',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <div className='flex items-center h-full'>
          <Link
            href={`survey/${params.row.id}`}
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
  useBreadcrumb('Encuestas', 'Todas las encuestas');
  const [filters, setFilters] = useState<TSurveyFilter>({
    pag: 1,
    title: '',
    limit: 10,
  });

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getSurveys(filters),
    refetchOnWindowFocus: false,
  });

  const { mutate } = useMutation({
    mutationFn: deleteSurvey,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Encuesta eliminada correctamente');
      }
    },
  });

  const handleDeleteBtn = (id: TSurvey['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar esta encuesta?')) {
        mutate(id);
      }
    }
  };

  if (isLoading) {
    <Spinner />;
  }

  if (data)
    return (
      <>
        <div className='mb-4 flex gap-2 flex-wrap mt-4'>
          <Link
            href='survey/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md hover:bg-accent-200'
          >
            Nueva Encuesta
          </Link>
        </div>
        <TaskTable<TSurveyFilter>
          rows={data.data.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            type: surveyTypeDictionary[
              item.type as keyof typeof surveyTypeDictionary
            ],
          }))}
          columns={allColumns}
          rowCount={data.meta.total}
          isLoading={isLoading}
          page={data.meta.actualPage - 1}
          pageSize={filters.limit!}
          onRowClick={() => {}}
          setFilters={setFilters}
          filters={filters}
          queryClientKey={queryKey}
        />
      </>
    );
}
