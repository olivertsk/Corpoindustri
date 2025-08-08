import { inputStlyes } from '@/src/lib/global';
import { ChatData } from '@/src/types/chat';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import {
  Control,
  useFieldArray,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import QuestionOptions from './QuestionOptions';
import { useEffect } from 'react';

export type QuestionsProps = {
  index: number;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<ChatData>;
  watch: UseFormWatch<ChatData>;
  control: Control<ChatData>;
  watchQuestionTypeFieldName: string;
  nameFieldArray: string;
  setValue: UseFormSetValue<ChatData>;
  optionIndex: number;
};

export default function Questions({
  index,
  remove,
  register,
  watch,
  control,
  watchQuestionTypeFieldName,
  nameFieldArray,
  setValue,
}: QuestionsProps) {
  const questionType = watch(
    `${watchQuestionTypeFieldName}.type` as `chatQuestions.${number}.type`
  );

  const {
    fields,
    append,
    remove: removeOption,
    update: updateOption,
  } = useFieldArray({
    control,
    name: `${nameFieldArray}.options` as `chatQuestions.${number}.options`,
    keyName: '_id',
  });

  const extractNumbersFromString = () => {
    const matches = watchQuestionTypeFieldName.match(/\d+/g);
    // Return numbers as 1.1, 2.1, etc.
    return matches ? matches?.map((num) => +num + 1).join('.') : '';
  };

  useEffect(() => {
    if (questionType !== 'options') {
      setValue(
        `${nameFieldArray}.options` as `chatQuestions.${number}.options`,
        []
      );
    }
  }, [questionType]);

  return (
    <div className='bg-white p-8  rounded-lg shadow-md space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-slate-500 font-bold text-lg'>
          Pregunta {extractNumbersFromString()}
        </h2>
        {index > 0 && (
          <button
            type='button'
            className='bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition-colors'
            onClick={() => remove(index)}
          >
            <XMarkIcon className='w-6' />
          </button>
        )}
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
          <label htmlFor='name'>Pregunta</label>
          <input
            type='text'
            id='name'
            placeholder='Escribe la pregunta aquí...'
            {...register(
              `${nameFieldArray}.name` as `chatQuestions.${number}.name`
            )}
            className={inputStlyes}
          />
        </div>
        <div>
          <label htmlFor='type'>Tipo de pregunta</label>
          <select
            className={`${inputStlyes} `}
            {...register(
              `${nameFieldArray}.type` as `chatQuestions.${number}.type`
            )}
            id='type'
          >
            <option value=''>Selecciona el tipo de pregunta</option>
            <option value='options'>Opciones</option>
            <option value='text'>Texto libre</option>
            <option value='search'>Busquedas</option>
          </select>
        </div>
      </div>
      {questionType === 'options' && (
        <>
          {fields.map((item, optionIndex) => (
            <div key={item._id} className='flex items-start space-x-4'>
              <QuestionOptions
                optionIndex={optionIndex}
                questionIndex={index}
                register={register}
                watch={watch}
                control={control}
                remove={remove}
                updateOption={updateOption}
                fields={fields}
                watchQuestionTypeFieldName={watchQuestionTypeFieldName}
                nameFieldArray={nameFieldArray}
                setValue={setValue}
              />
              {optionIndex > 0 && (
                <button
                  type='button'
                  className='bg-red-500 text-white p-2 rounded-md shadow-md hover:bg-red-600 transition-colors mt-6'
                  onClick={() => removeOption(optionIndex)}
                >
                  <XMarkIcon className='w-6' />
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
            onClick={() =>
              append({ name: '', chatQuestionId: '', autoResponse: '' })
            }
            className='bg-blue-600  mt-4 p-2 rounded-md shadow-md flex items-center text-white hover:bg-blue-700 transition-colors'
          >
            <PlusCircleIcon className='w-6 text-white' />
            <span className='text-white ml-2'>Agregar Opción</span>
          </button>
        </>
      )}
    </div>
  );
}
