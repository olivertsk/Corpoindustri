'use client';

import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { TSurvey, TSurveyForm } from '@/src/types/survey';
import { NewSurveyRef, SurveyForm } from './SurveyForm';
import { updateSurvey } from '@/src/api/SurveyApi';
import { useRef } from 'react';

type EditCategoryWrapperProps = {
  survey: TSurvey;
};

export default function EditSurveyWrapper({
  survey,
}: EditCategoryWrapperProps) {
  const navigate = useRouter();
  useBreadcrumb('Encuestas', 'Editar Encuesta');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSurveyForm>({
    defaultValues: {
      title: survey.title,
      type: survey.type,
      description: survey.description,
      questions: survey.questions,
    },
  });
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleForm = async (formData: TSurveyForm) => {
    const response = await updateSurvey({
      data: formData,
      id: id as string,
    });
    if (response.success) {
      await surveyRef.current?.onSubmit(response.item.id);
      reset();
      queryClient.invalidateQueries({ queryKey: ['survey', id] });
      queryClient.invalidateQueries({ queryKey: ['survey'] });
      navigate.push('/admin/survey');
      setTimeout(() => {
        toast.success('Encuesta actualizada correctamente', {
          toastId: 'update-survey',
        });
      }, 1000);
    } else {
      toast.error('Ha ocurrido un error');
    }
  };
  const surveyRef = useRef<NewSurveyRef | null>(null);
  return (
    <form
      onSubmit={handleSubmit((data) =>
        handleForm({
          description: data.description,
          title: data.title,
          type: data.type,
        })
      )}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <SurveyForm
        ref={surveyRef}
        survey={survey}
        register={register}
        errors={errors}
      />
    </form>
  );
}
