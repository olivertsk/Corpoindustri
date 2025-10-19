import { inputStlyes } from '@/src/lib/global';
import { ChatData } from '@/src/types/chat';
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import Questions from './Questions';

type QuestionOptionsProps = {
  fields: FieldArrayWithId<
    ChatData,
    `chatQuestions.${number}.options`,
    '_id'
  >[];
  register: UseFormRegister<ChatData>;
  questionIndex: number;
  optionIndex: number;
  watch: UseFormWatch<ChatData>;
  remove: UseFieldArrayRemove;
  control: Control<ChatData>;
  updateOption: UseFieldArrayUpdate<
    ChatData,
    `chatQuestions.${number}.options`
  >;
  watchQuestionTypeFieldName: string;
  nameFieldArray: string;
  setValue: UseFormSetValue<ChatData>;
};

export default function QuestionOptions({
  register,
  questionIndex,
  optionIndex,
  watch,
  control,
  remove,
  watchQuestionTypeFieldName,
  nameFieldArray,
  setValue,
}: QuestionOptionsProps) {
  const answerType = watch(
    `${watchQuestionTypeFieldName}.options.${optionIndex}.answerType` as `chatQuestions.${number}.options.${number}.answerType`
  );

  const handleChangeAnswerType = () => {
    setTimeout(() => {
      setValue(
        `${watchQuestionTypeFieldName}.options.${optionIndex}.chatQuestion` as `chatQuestions.${number}.options.${number}.chatQuestion`,
        null
      );
      setValue(
        `${watchQuestionTypeFieldName}.options.${optionIndex}.autoResponse` as `chatQuestions.${number}.options.${number}.autoResponse`,
        ''
      );
    }, 100);
    console.log('called');
  };

  return (
    <div className='w-full'>
      <div>
        <label htmlFor='name'>Nombre de la respuesta</label>
        <input
          type='text'
          id='name'
          placeholder='Escribe la respuesta aquí...'
          className={inputStlyes}
          {...register(
            `${watchQuestionTypeFieldName}.options.${optionIndex}.name` as `chatQuestions.${number}.options.${number}.name`
          )}
        />
        <div className='flex gap-2 mt-4 mb-2'>
          <div className='mt-1'>
            <input
              type='radio'
              id={`${watchQuestionTypeFieldName}.options.${optionIndex}.answerType`}
              {...register(
                `${watchQuestionTypeFieldName}.options.${optionIndex}.answerType` as `chatQuestions.${number}.options.${number}.answerType`,
                {
                  onChange: handleChangeAnswerType,
                }
              )}
              value={'text'}
            />
            <label
              htmlFor={`${watchQuestionTypeFieldName}.options.${optionIndex}.answerType`}
              className='ml-2'
            >
              Agregar auto respuesta
            </label>
          </div>
          <div className='mt-1'>
            <input
              type='radio'
              id={`${watchQuestionTypeFieldName}.options.${optionIndex}.question`}
              {...register(
                `${watchQuestionTypeFieldName}.options.${optionIndex}.answerType` as `chatQuestions.${number}.options.${number}.answerType`,
                {
                  onChange: handleChangeAnswerType,
                }
              )}
              value={'question'}
            />
            <label
              htmlFor={`${watchQuestionTypeFieldName}.options.${optionIndex}.question`}
              className='ml-2'
            >
              Agrear otra pregunta
            </label>
          </div>
          <div className='mt-1'>
            <input
              type='radio'
              id={`${watchQuestionTypeFieldName}.options.${optionIndex}.none`}
              {...register(
                `${watchQuestionTypeFieldName}.options.${optionIndex}.answerType` as `chatQuestions.${number}.options.${number}.answerType`,
                {
                  onChange: handleChangeAnswerType,
                }
              )}
              value={'none'}
            />
            <label
              htmlFor={`${watchQuestionTypeFieldName}.options.${optionIndex}.none`}
              className='ml-2'
            >
              Ninguno
            </label>
          </div>
        </div>
        {answerType === 'text' && (
          <div className='pl-8'>
            <textarea
              id='name'
              placeholder='Ej. Nuestros horarios son de lunes a viernes de 8:00 a 17:00...'
              className={`${inputStlyes} w-full resize-none`}
              style={
                {
                  'field-sizing': 'content',
                } as React.CSSProperties
              }
              {...register(
                `${watchQuestionTypeFieldName}.options.${optionIndex}.autoResponse` as `chatQuestions.${number}.options.${number}.autoResponse`
              )}
            />
          </div>
        )}
        {answerType === 'question' && (
          <Questions
            index={questionIndex}
            optionIndex={optionIndex}
            register={register}
            watch={watch}
            control={control}
            remove={remove}
            nameFieldArray={`${watchQuestionTypeFieldName}.options.${optionIndex}.chatQuestion`}
            watchQuestionTypeFieldName={`${nameFieldArray}.options.${optionIndex}.chatQuestion`}
            setValue={setValue}
          />
        )}
      </div>
    </div>
  );
}
