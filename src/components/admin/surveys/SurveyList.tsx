import { getSurveyList, TSurveyListParams } from '@/src/api/SurveyApi';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import Spinner from '../../spinner/Spinner';
import { Pagination } from '@mui/material';
import {
  editBtn,
  tableBodyStyles,
  tableHeadStyles,
  tableStyles,
} from '@/src/lib/global';
import Link from 'next/link';

export default function SurveyList() {
  const [filters, setFilters] = useState<TSurveyListParams>({
    pag: 1,
    title: '',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['surveys_list'],
    queryFn: () => getSurveyList(filters),
  });

  console.log('data :>> ', data);

  const queryClient = useQueryClient();
  const changePage = (page: number) => {
    setFilters({ ...filters, pag: page });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: ['surveys_list'] });
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <div>
        <div className='mt-4'>
          <table className={tableStyles}>
            <thead>
              <tr>
                <th className={tableHeadStyles}>Encuesta</th>
                <th className={tableHeadStyles}>Usuario</th>
                <th className={tableHeadStyles}>Email</th>
                <th className={tableHeadStyles}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((survey) => (
                <tr key={survey.id}>
                  <td className={tableBodyStyles}>{survey.survey.title}</td>
                  <td className={tableBodyStyles}>{survey.user.name}</td>
                  <td className={tableBodyStyles}>{survey.user.email}</td>
                  <td className={tableBodyStyles}>
                    <Link href={`survey/list/${survey.id}`} className={editBtn}>
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-8'>
          <Pagination
            count={data.meta.totalPage}
            page={data.meta.actualPage}
            onChange={(ev, page) => changePage(page)}
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    );
}
