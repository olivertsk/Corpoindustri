'use client';

import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { TSurveyQuestion, TSurveyQuestionForm } from '@/src/types/question';
import { SurveyQuestionForm } from './SurveyQuestionForm';
import { updateSurveyQuestion } from '@/src/api/SurveyQuestionApi';

type EditCategoryWrapperProps = {
  surveyQuestion: TSurveyQuestion;
};

export default function EditSurveyQuestionWrapper({
  surveyQuestion,
}: EditCategoryWrapperProps) {
  const navigate = useRouter();
  useBreadcrumb('Encuestas', 'Editar Encuesta');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<TSurveyQuestionForm>({
    defaultValues: surveyQuestion,
  });
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleForm = async (formData: TSurveyQuestionForm) => {
    const response = await updateSurveyQuestion({
      data: { ...formData, id: id as string },
      id: id as string,
    });
    if (response.success) {
      reset();
      queryClient.invalidateQueries({ queryKey: ['survey', id] });
      queryClient.invalidateQueries({ queryKey: ['survey'] });
      navigate.push('/admin/survey?segment=questions');
      setTimeout(() => {
        toast.success('Categoria actualizada correctamente', {
          toastId: 'update-survey',
        });
      }, 1000);
    } else {
      toast.error('Ha ocurrido un error');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <SurveyQuestionForm watch={watch} register={register} errors={errors} />
    </form>
  );
}
