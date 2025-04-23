'use client';

import {
  createSurveyQuestion,
  updateSurveyQuestion,
} from '@/src/api/SurveyQuestionApi';
import {
  SurveyQuestionForm,
  SurveyQuestionRef,
} from '@/src/components/admin/surveys/questions/SurveyQuestionForm';
import { TSurveyQuestion, TSurveyQuestionForm } from '@/src/types/question';
import { TSurvey } from '@/src/types/survey';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type NewQuestionProps = {
  surveyQuestion: TSurveyQuestion;
};

export type NewQuestionRef = {
  onSubmit: (surveyId: TSurvey['id']) => Promise<void>;
};

export const NewQuestion = forwardRef<NewQuestionRef, NewQuestionProps>(
  ({ surveyQuestion }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm<TSurveyQuestionForm>({
      defaultValues: {
        order: surveyQuestion?.order || 0,
        text: surveyQuestion?.text || '',
        type: surveyQuestion?.type,
      },
    });

    const handleForm = async (formData: TSurveyQuestionForm) => {
      if (surveyQuestion && surveyQuestion.id) {
        const response = await updateSurveyQuestion({
          data: { ...formData, id: surveyQuestion.id },
          id: surveyQuestion.id,
        });
        if (response.success) {
          console.log('response updateSurveyQuestion :>> ', response);
          await surveyQuestionRef.current?.onSubmit(response.item.id);
        } else {
          toast.error('Ha ocurrido un error');
        }
      } else {
        const response = await createSurveyQuestion(formData);
        if (response.success) {
          await surveyQuestionRef.current?.onSubmit(response.item.id);
        } else {
          toast.error('Ha ocurrido un error');
        }
      }
    };

    const onSubmit = async (surveyId: TSurvey['id']) => {
      await handleSubmit((data) => handleForm({ ...data, surveyId }))();
    };

    useImperativeHandle(ref, () => ({
      onSubmit,
    }));

    const surveyQuestionRef = useRef<SurveyQuestionRef>(null);

    return (
      <SurveyQuestionForm
        ref={surveyQuestionRef}
        surveyAnswerOptions={surveyQuestion.answers}
        watch={watch}
        register={register}
        errors={errors}
      />
    );
  }
);

NewQuestion.displayName = 'NewQuestion';
