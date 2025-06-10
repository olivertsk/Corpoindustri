import { AnswerQuestion, getSurvey, sendAnswers } from '@/src/api/SurveyApi';
import { TSurvey } from '@/src/types/survey';
import { Dialog } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ESurveyQuestionType } from '@/src/types/question';
import { inputStlyes } from '@/src/lib/global';
import { useFieldArray, useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { useAuthStore } from '@/src/store/authStore';
import { toast } from 'react-toastify';

export default function SurveyModal({
  surveyId,
  setSurveyId,
}: {
  surveyId?: TSurvey['id'];
  setSurveyId: Dispatch<SetStateAction<string | undefined>>;
}) {
  const handleClose = () => {
    setSurveyId(undefined);
  };

  const { data, isLoading } = useQuery({
    queryKey: ['survey', surveyId],
    queryFn: () => getSurvey(surveyId!),
    enabled: !!surveyId,
  });

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<AnswerQuestion>({
    defaultValues: {
      answers: [],
    },
  });

  const answersControl = useFieldArray({
    name: 'answers',
    control,
    keyName: '_id',
  });

  useEffect(() => {
    if (data) {
      answersControl.replace(
        data.questions?.map((question) => ({
          questionId: question.id!,
          surveyId: surveyId!,
        })) || []
      );
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: sendAnswers,
    onSuccess: (data) => {
      console.log('data :>> ', data);
      toast.success('Gracias por responder la encuesta!');
      setSurveyId(undefined);
    },
  });

  const user = useAuthStore((state) => state.user);
  const handleFormSubmit = (formData: AnswerQuestion) => {
    mutate({
      email: user?.email,
      name: user?.name,
      phone: user?.phoneNumber?.toString(),
      surveyId: surveyId!,
      responses: formData.answers,
    });
    console.log('formData :>> ', formData);
  };

  return (
    <Dialog open={!!surveyId} onClose={handleClose}>
      {isLoading && <Spinner />}
      {data && (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className='p-4  md:min-w-[500px] overflow-x-hidden overflow-auto'
        >
          <div className='text-right'>
            <button onClick={handleClose}>
              <XMarkIcon className='w-5 h-5' />
            </button>
          </div>
          <h2 className='font-bold '>{data.title}</h2>
          <p className='text-sm '>{data.description}</p>
          <div className='mt-5'>
            {data.questions?.map((question, idx) => (
              <div key={question.id} className='mb-4'>
                <label className='text-sm font-bold'>{question.text}</label>
                {question.type === ESurveyQuestionType.TEXT && (
                  <div>
                    <textarea
                      className={`${inputStlyes} text-sm resize-none h-32`}
                      {...register(`answers.${idx}.text`)}
                    />
                    {errors.answers?.[idx]?.text && (
                      <ErrorMessage>Este campo es requerido</ErrorMessage>
                    )}
                  </div>
                )}
                {question.type === ESurveyQuestionType.SELECTION && (
                  <div>
                    <div>
                      {question.answers?.map((option) => (
                        <div key={option.id} className='flex items-center mb-2'>
                          <input
                            type='radio'
                            id={`option-${option.id}`}
                            value={option.id}
                            {...register(`answers.${idx}.answerOptionId`)}
                          />
                          <label
                            htmlFor={`option-${option.id}`}
                            className='ml-2 text-sm'
                          >
                            {option.text}
                          </label>
                        </div>
                      ))}
                      {errors.answers?.[idx]?.answerOptionId && (
                        <ErrorMessage>Este campo es requerido</ErrorMessage>
                      )}
                    </div>

                    {errors.answers?.[idx]?.text && (
                      <ErrorMessage>Este campo es requerido</ErrorMessage>
                    )}
                  </div>
                )}
              </div>
            ))}
            <div className='flex justify-center'>
              <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'>
                Enviar
              </button>
              <button
                type='button'
                onClick={handleClose}
                className='bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2 hover:bg-gray-400'
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      )}
    </Dialog>
  );
}
