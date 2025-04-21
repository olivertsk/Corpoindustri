import { deleteBtn, inputStlyes, primaryBtn } from '@/src/lib/global';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import {
  ESurveyQuestionType,
  TSurveyQuestion,
  TSurveyQuestionForm,
} from '@/src/types/question';
import ErrorMessage from '@/src/components/ErrorMessage';
import { NewOption, NewOptionRef } from '../options/NewOption';
import {
  createRef,
  forwardRef,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TAnswerOption } from '@/src/types/surveyOptions';

type SurveyQuestionFormProps = {
  register: UseFormRegister<TSurveyQuestionForm>;
  errors: FieldErrors<TSurveyQuestionForm>;
  watch: UseFormWatch<TSurveyQuestionForm>;
  surveyAnswerOptions?: TAnswerOption[] | undefined;
};

export type SurveyQuestionRef = {
  onSubmit: (questionId: TSurveyQuestion['id']) => Promise<void>;
};

export const SurveyQuestionForm = forwardRef<
  SurveyQuestionRef,
  SurveyQuestionFormProps
>(({ register, errors, watch, surveyAnswerOptions }, ref) => {
  const type = watch('type');
  const [options, setOptions] = useState<TAnswerOption[]>(
    surveyAnswerOptions || [
      {
        text: '',
      },
    ]
  );

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        text: '',
      },
    ]);
  };

  const handleRemoveOption = () => {
    setOptions((prev) => prev.slice(0, -1));
  };

  const surveyOptionsRefs = useRef<{
    [key: number]: RefObject<NewOptionRef>;
  }>({});

  const onSubmit = async (questionId: TSurveyQuestion['id']) => {
    console.log('surveyOptionsRefs :>> ', surveyOptionsRefs);
    const promises = [];
    for (const key in surveyOptionsRefs.current) {
      if (
        Object.prototype.hasOwnProperty.call(surveyOptionsRefs.current, key)
      ) {
        const element = surveyOptionsRefs.current[key];
        promises.push(element.current?.onSubmit(questionId));
      }
    }
    await Promise.all(promises);
  };

  useImperativeHandle(ref, () => ({
    onSubmit,
  }));

  return (
    <>
      <div>
        <div className='grid grid-cols-2 gap-4 mt-8'>
          <div>
            <label htmlFor=''>
              Nombre de la Pregunta
              <input
                className={inputStlyes}
                type='text'
                placeholder='Ej. ¿Como calificarías el servicio?'
                {...register('text', {
                  required: 'Este campo es requerido',
                })}
              />
            </label>
            {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
          </div>

          <div>
            <label htmlFor=''>
              Tipo de Pregunta
              <select className={inputStlyes} {...register('type')}>
                <option disabled value={''}>
                  Selecciona una opción
                </option>
                <option value={ESurveyQuestionType.TEXT}>Texto</option>
                <option value={ESurveyQuestionType.SELECTION}>Selección</option>
              </select>
            </label>
            {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
          </div>
        </div>
      </div>
      {type === ESurveyQuestionType.SELECTION && (
        <>
          {options.map((answerOption, idx) => {
            if (!surveyOptionsRefs.current[idx]) {
              surveyOptionsRefs.current[idx] = createRef<NewOptionRef>();
            }
            return (
              <div key={idx}>
                <NewOption
                  answerOption={answerOption}
                  ref={surveyOptionsRefs.current[idx]}
                />
              </div>
            );
          })}
          <div className='flex  mt-8 gap-2'>
            <button
              className={primaryBtn}
              type='button'
              onClick={handleAddOption}
            >
              Agregar Opción
            </button>
            <button
              className={`${deleteBtn} ${options.length <= 1 && 'hidden'}`}
              type='button'
              onClick={handleRemoveOption}
            >
              Remover Opción
            </button>
          </div>
        </>
      )}
      {/* <div className='flex justify-center mt-8 gap-2'>
          <button className={`${primaryBtn} `}>Guardar</button>
          <button
            onClick={() => navigate.push('/admin/survey?segment=questions')}
            type='button'
            className={secondaryBtn}
          >
            Cancelar
          </button>
        </div> */}
    </>
  );
});

SurveyQuestionForm.displayName = 'SurveyQuestionForm';
