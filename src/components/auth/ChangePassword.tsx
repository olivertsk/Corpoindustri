import { inputStlyes, primaryBtn, secondaryBtn } from '@/src/lib/global';
import { UserFormChangePassword } from '@/src/types/user';
import { Dialog, DialogTitle } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';
import { useMutation } from '@tanstack/react-query';
import { updateUserPassword } from '@/src/api/AuthApi';
import { toast } from 'react-toastify';

type ChangePasswordProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ChangePassword({ open, setOpen }: ChangePasswordProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<UserFormChangePassword>({
    defaultValues: {
      oldPasword: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: updateUserPassword,
    onSuccess: (data) => {
      if (!data.success) {
        if (typeof data.message === 'string') {
          return toast.error(data.message);
        }
        data.message.forEach(
          (item: { field: keyof UserFormChangePassword; message: string }) => {
            setError(item.field, { message: item.message });
          }
        );
        return;
      }
      toast.success('Contraseña actualizada');
      reset();
      setOpen(false);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleForm = (data: UserFormChangePassword) => mutate(data);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle className='text-center !font-bold'>
        Cambiar Contraseña
      </DialogTitle>
      <form
        onSubmit={handleSubmit(handleForm)}
        className='p-6 pt-0 flex flex-col gap-4'
      >
        <label htmlFor=''>
          Contraseña Actual
          <input
            {...register('oldPasword', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
            type='password'
          />
          {errors.oldPasword && (
            <ErrorMessage>{errors.oldPasword.message}</ErrorMessage>
          )}
        </label>
        <label htmlFor=''>
          Nueva Contraseña
          <input
            {...register('password', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
            type='password'
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </label>
        <label htmlFor=''>
          Confirmar Contraseña
          <input
            {...register('passwordConfirmation', {
              required: 'Este campo es requerido',
            })}
            className={inputStlyes}
            type='password'
          />
          {errors.passwordConfirmation && (
            <ErrorMessage>{errors.passwordConfirmation.message}</ErrorMessage>
          )}
        </label>
        <div className='flex justify-center gap-4'>
          <button className={`${primaryBtn} flex-1 text-nowrap !rounded-full`}>
            Guardar
          </button>
          <button
            type='button'
            onClick={() => setOpen(false)}
            className={`${secondaryBtn} flex-1 text-nowrap bg-yellow-100 text-yellow-700 border-yellow-700 !rounded-full`}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
