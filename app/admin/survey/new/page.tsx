'use client';

import { createSurvey } from '@/src/api/SurveyApi';
import {
  NewSurveyRef,
  SurveyForm,
} from '@/src/components/admin/surveys/SurveyForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { containerStyles } from '@/src/lib/global';
import { ESurveyType, TSurveyForm } from '@/src/types/survey';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function NewCategory() {
  const navigate = useRouter();
  useBreadcrumb('Encuestas', 'Nueva Encuesta');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TSurveyForm>({
    defaultValues: {
      title: '',
      type: ESurveyType.FIRSTPURCHASE,
      description: '',
    },
  });

  const queryClient = useQueryClient();

  const handleForm = async (formData: TSurveyForm) => {
    const response = await createSurvey(formData);
    if (response.success) {
      await surveyRef.current?.onSubmit(response.item.id);
      queryClient.invalidateQueries({ queryKey: ['survey'] });
      navigate.replace('/admin/survey');
      reset();
      setTimeout(() => {
        toast.success('Encuesta creada correctamente');
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
      className={containerStyles}
    >
      <SurveyForm ref={surveyRef} register={register} errors={errors} />
    </form>
  );
}
