import ErrorMessage from '@/src/components/ErrorMessage';
import { inputStlyes } from '@/src/lib/global';
import { TAnswerOptionForm } from '@/src/types/surveyOptions';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

type OptionFormProps = {
  register: UseFormRegister<TAnswerOptionForm>;
  errors: FieldErrors<TAnswerOptionForm>;
};

export default function OptionForm({ register, errors }: OptionFormProps) {
  return (
    <>
      <div>
        <label htmlFor='optionName'>Nombre de la Opción</label>
        <input
          type='text'
          id='optionName'
          className={inputStlyes}
          {...register('text')}
        />
        {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
      </div>
    </>
  );
}
