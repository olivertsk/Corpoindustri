import { TAnswerOption, TAnswerOptionForm } from '@/src/types/surveyOptions';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import OptionForm from './OptionForm';
import { TSurveyQuestion } from '@/src/types/question';
import {
  createSurveyAnswerOption,
  updateSurveyAnswerOption,
} from '@/src/api/SurveyQuestionOptions';

type NewOptionProps = {
  answerOption?: TAnswerOption;
};

export type NewOptionRef = {
  onSubmit: (questionId: TSurveyQuestion['id']) => Promise<void>;
};

export const NewOption = forwardRef<NewOptionRef, NewOptionProps>(
  ({ answerOption }, ref) => {
    const {
      register,
      formState: { errors },
      setValue,
      getValues,
    } = useForm<TAnswerOptionForm>({
      defaultValues: {
        text: '',
        questionId: '',
        order: 0,
      },
    });

    useEffect(() => {
      if (answerOption) {
        setValue('text', answerOption.text);
        setValue('questionId', answerOption.questionId);
        setValue('order', answerOption.order || 0);
      }
    }, [answerOption]);

    const handleForm = async (formData: TAnswerOptionForm) => {
      try {
        console.log('Hanlding Form');
        if (answerOption && answerOption.id) {
          const response = await updateSurveyAnswerOption({
            data: formData,
            id: answerOption.id,
          });
          console.log('response', response);
        } else {
          const response = await createSurveyAnswerOption(formData);
          console.log('response', response);
        }
      } catch (error) {
        console.error('Error creating/updating option:', error);
        // Handle error (e.g., show a toast notification)
        // toast.error('Error creating/updating option');
      }
    };

    const onSubmit = async (questionId: TSurveyQuestion['id']) => {
      console.log('questionId', questionId);
      const values = getValues();
      await handleForm({ ...values, questionId });
    };

    useImperativeHandle(ref, () => ({
      onSubmit,
    }));

    return (
      <div className='lg:max-w-md mt-4'>
        <OptionForm register={register} errors={errors} />
      </div>
    );
  }
);

NewOption.displayName = 'NewOption';
