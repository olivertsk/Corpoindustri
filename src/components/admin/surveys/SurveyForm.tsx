import { inputStlyes, primaryBtn, secondaryBtn } from '@/src/lib/global';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import { useRouter } from 'next/navigation';
import { ESurveyType, TSurvey, TSurveyForm } from '@/src/types/survey';
import {
  NewQuestion,
  NewQuestionRef,
} from '@/app/admin/survey/questions/new/page';
import {
  createRef,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ESurveyQuestionType, TSurveyQuestion } from '@/src/types/question';
import { deleteSurveyQuestion } from '@/src/api/SurveyQuestionApi';
import { TrashIcon } from '@heroicons/react/24/outline';

type NewSurveyFormProps = {
  register: UseFormRegister<TSurveyForm>;
  errors: FieldErrors<TSurveyForm>;
  survey?: TSurvey;
};

export type NewSurveyRef = {
  onSubmit: (surveyId: TSurvey['id']) => Promise<void>;
};

export const SurveyForm = forwardRef<NewSurveyRef, NewSurveyFormProps>(
  ({ errors, register, survey }, ref) => {
    const navigate = useRouter();
    const [questions, setQuestions] = useState<TSurveyQuestion[]>(
      survey?.questions || [
        {
          text: '',
          type: ESurveyQuestionType.TEXT,
        },
      ]
    );

    const handleAddQuestion = () => {
      setQuestions((prev) => [
        ...prev,
        {
          text: '',
        },
      ]);
    };

    const handleRemoveQuestion = async (idx: number) => {
      if (questions[idx].id) {
        const res = await deleteSurveyQuestion(questions[idx].id);
        console.log('res :>> ', res);
      }
      setQuestions((prev) => prev.filter((_, index) => index !== idx));
    };

    const surveyQuestionsRefs = useRef<{
      [key: number]: RefObject<NewQuestionRef>;
    }>({});

    useImperativeHandle(ref, () => ({
      onSubmit: async (surveyId: TSurvey['id']) => {
        const promises = questions.map((_, idx) => {
          if (surveyQuestionsRefs.current[idx]) {
            return surveyQuestionsRefs.current[idx].current?.onSubmit(surveyId);
          }
        });
        await Promise.all(promises);
      },
    }));

    return (
      <>
        <div>
          <div className='grid grid-cols-2 gap-4 mt-8'>
            <div>
              <label htmlFor=''>
                Titulo
                <input
                  className={inputStlyes}
                  type='text'
                  {...register('title', {
                    required: 'Este campo es requerido',
                  })}
                />
              </label>
              {errors.title && (
                <ErrorMessage>{errors.title.message}</ErrorMessage>
              )}
            </div>

            <div>
              <label htmlFor=''>
                Al momento de
                <select className={inputStlyes} {...register('type')}>
                  <option value={ESurveyType.FIRSTPURCHASE}>
                    Primer Compra
                  </option>
                  <option value={ESurveyType.REGISTER}>Registro</option>
                </select>
              </label>
              {errors.type && (
                <ErrorMessage>{errors.type.message}</ErrorMessage>
              )}
            </div>
            <div>
              <label htmlFor=''>
                Descripción
                <textarea
                  className={`${inputStlyes} h-32 resize-none`}
                  {...register('description')}
                />
              </label>
              {errors.description && (
                <ErrorMessage>{errors.description.message}</ErrorMessage>
              )}
            </div>
          </div>
        </div>
        <div className=''>
          <h2 className='text-2xl font-bold mt-8 mb-4'>Preguntas</h2>
          <div>
            <div className='space-y-4'>
              {questions.map((question, idx) => {
                if (!surveyQuestionsRefs.current[idx]) {
                  surveyQuestionsRefs.current[idx] =
                    createRef<NewQuestionRef>();
                }
                return (
                  <div
                    key={idx}
                    className='border border-gray-300 rounded-md p-4'
                  >
                    <div className='flex justify-between items-center'>
                      <p className=' text-gray-500'>Pregunta {idx + 1}</p>
                      <button
                        onClick={() => handleRemoveQuestion(idx)}
                        type='button'
                        hidden={questions.length <= 1 || idx === 0}
                        className={`hover:bg-red-600 transition-colors rounded-md px-4 py-2 bg-red-500 text-white mt-4  gap-2 items-center`}
                      >
                        <TrashIcon className='h-4 w-4 inline-block mr-2 -mt-1' />
                        Remover Pregunta
                      </button>
                    </div>
                    <NewQuestion
                      ref={surveyQuestionsRefs.current[idx]}
                      surveyQuestion={question}
                      key={idx}
                    />
                  </div>
                );
              })}
            </div>
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleAddQuestion}
                type='button'
                className={`${primaryBtn} mt-4`}
              >
                Añadir Pregunta
              </button>
            </div>
          </div>
        </div>
        <div className='flex justify-center mt-8 gap-2'>
          <button className={`${primaryBtn} `}>Guardar</button>
          <button
            onClick={() => navigate.push('/admin/survey')}
            type='button'
            className={secondaryBtn}
          >
            Cancelar
          </button>
        </div>
      </>
    );
  }
);
SurveyForm.displayName = 'SurveyForm';
