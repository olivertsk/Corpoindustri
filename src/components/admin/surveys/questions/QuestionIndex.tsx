import {
  deleteSurveyQuestion,
  getQuestionSurveyQuestions,
} from '@/src/api/SurveyQuestionApi';
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
  surveyQuestionTypeDictionary,
  TSurveyQuestion,
  TSurveyQuestionFilter,
} from '@/src/types/question';
import { Pagination } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';

const queryKey = 'question';

export default function QuestionIndex() {
  useBreadcrumb('Encuestas', 'Todas las encuestas');
  const [filters, setFilters] = useState<TSurveyQuestionFilter>({
    pag: 1,
    text: '',
  });

  const handleChange = (
    ev: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [ev.target.name]: ev.target.value });
  };

  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [queryKey],
    queryFn: () => getQuestionSurveyQuestions(filters),
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
    mutationFn: deleteSurveyQuestion,
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
        toast.success('Pregunta eliminada correctamente');
      }
    },
  });

  const handleFilterBtn = () => {
    setFilters({ ...filters, pag: 1 });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    });
  };

  const handleDeleteBtn = (id: TSurveyQuestion['id']) => {
    if (typeof window !== 'undefined') {
      if (window.confirm('¿Estás seguro de eliminar esta pregunta?')) {
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
            value={filters.text!}
            onChange={handleChange}
            type='text'
            name='text'
            placeholder='Buscar Encuesta por Nombre'
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
            href='survey/questions/new'
            className='bg-accent-100 font-bold py-2 px-4 rounded-md hover:bg-accent-200'
          >
            Nueva Pregunta
          </Link>
        </div>
        <table className={tableStyles}>
          <thead>
            <tr>
              <th className={tableHeadStyles}>Nombre</th>
              <th className={tableHeadStyles}>Encuesta</th>
              <th className={tableHeadStyles}>Tipo</th>
              <th className={tableHeadStyles}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((surveyQuestion) => (
              <tr key={surveyQuestion.id}>
                <td className={tableBodyStyles}>{surveyQuestion.text}</td>
                <td className={tableBodyStyles}>{surveyQuestion.surveyId}</td>
                <td className={tableBodyStyles}>
                  {
                    surveyQuestionTypeDictionary[
                      surveyQuestion.type as keyof typeof surveyQuestionTypeDictionary
                    ]
                  }
                </td>
                <td className={tableBodyStyles}>
                  <Link
                    href={`survey/questions/${surveyQuestion.id}`}
                    className={editBtn}
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDeleteBtn(surveyQuestion.id)}
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
            onChange={(_, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </>
    );
}
