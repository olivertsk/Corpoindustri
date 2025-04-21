import { deleteSurvey, getSurveys } from '@/src/api/SurveyApi';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import {
  deleteBtn,
  editBtn,
  tableBodyStyles,
  tableHeadStyles,
  tableStyles,
} from '@/src/lib/global';
import {
  surveyTypeDictionary,
  TSurvey,
  TSurveyFilter,
} from '@/src/types/survey';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'survey';

export default function SurveyIndex() {
  useBreadcrumb('Encuestas', 'Todas las encuestas');
  const [filters, setFilters] = useState<TSurveyFilter>({
    pag: 1,
    title: '',
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getSurveys(filters),
    refetchOnWindowFocus: false,
  });

  console.log('data :>> ', data);

  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const { mutate } = useMutation({
    mutationFn: deleteSurvey,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Encuesta eliminada correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

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
        <h4 className='font-bold mb-2'>Filtros</h4>
        <div className='mb-4 flex gap-2 flex-wrap'>
          <input
            value={filters.title!}
            onChange={handleChange}
            type='text'
            name='title'
            placeholder='Buscar Encuesta por Titulo'
            className='h-full py-2 rounded-md flex-1 px-4'
            onKeyUp={(ev) => ev.key === 'Enter' && handleFilterBtn()}
          />
          <button
            onClick={handleFilterBtn}
            className='bg-primary text-white py-2 px-4 rounded-md font-bold hover:bg-primaryHover'
          >
            Filtrar
          </button>
          <Link
            href='survey/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md hover:bg-accent-200'
          >
            Nueva Encuesta
          </Link>
        </div>
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className={tableHeadStyles}>Titulo</th>
              <th className={tableHeadStyles}>Descripción</th>
              <th className={tableHeadStyles}>Tipo</th>
              <th className={tableHeadStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((survey) => (
              <tr key={survey.id}>
                <td className={tableBodyStyles}>{survey.title}</td>
                <td className={tableBodyStyles}>{survey.description}</td>
                <td className={tableBodyStyles}>
                  {
                    surveyTypeDictionary[
                      survey.type as keyof typeof surveyTypeDictionary
                    ]
                  }
                </td>
                <td className={tableBodyStyles}>
                  <Link href={`survey/${survey.id}`} className={editBtn}>
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteBtn(survey.id)}
                    className={deleteBtn}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center mt-8'>
          <Pagination
            count={data.meta.totalPage}
            page={data.meta.actualPage}
            onChange={(ev, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </>
    );
}
