import {
  deleteBtn,
  inputStlyes,
  primaryBtn,
  secondaryBtn,
} from '@/src/lib/global';
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

    const handleRemoveQuestion = () => {
      setQuestions((prev) => prev.slice(0, -1));
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
          <h2 className='text-2xl font-bold mt-8'>Preguntas</h2>
          <div>
            <p className='text-sm text-gray-500'>Pregunta 1</p>
            {questions.map((question, idx) => {
              if (!surveyQuestionsRefs.current[idx]) {
                surveyQuestionsRefs.current[idx] = createRef<NewQuestionRef>();
              }
              return (
                <NewQuestion
                  ref={surveyQuestionsRefs.current[idx]}
                  surveyQuestion={question}
                  key={idx}
                />
              );
            })}
            <div className='flex justify-end gap-4'>
              <button
                onClick={handleAddQuestion}
                type='button'
                className={`${primaryBtn} mt-4`}
              >
                Añadir Pregunta
              </button>
              <button
                onClick={handleRemoveQuestion}
                type='button'
                className={`${deleteBtn} mt-4 ${
                  questions.length <= 1 && 'hidden'
                }`}
              >
                Remover Pregunta
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
