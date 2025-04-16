import { deleteUser } from '@/src/api/AuthApi';
import { primaryBtn } from '@/src/lib/global';
import { useAuthStore } from '@/src/store/authStore';
import { Dialog, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';

type ConfirmDeleteAccountProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmDeleteAccount({
  open,
  setOpen,
}: ConfirmDeleteAccountProps) {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const handleDeleteAccount = async () => {
    const response = await deleteUser();
    if (response.success) {
      handleLogout();
    }
    // Delete account logic here
  };

  const handleLogout = () => {
    logout();
    router.replace('/');
    toast.success('Cuenta eliminada correctamente');
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      sx={{ maxWidth: '400px' }}
      className='mx-auto'
    >
      <DialogTitle className='text-center !font-bold'>
        ¿Estás seguro que deseas eliminar tú cuenta?
      </DialogTitle>
      <section className='p-6 pt-0'>
        <p>
          Al eliminar tú cuenta, perderás todos los datos asociados a ella. Esta
          acción no se puede deshacer.
        </p>
        <div className='flex gap-4 mt-4'>
          <button
            className={`${primaryBtn} bg-red-100 border-2 border-red-700 text-red-700 w-full hover:bg-red-200`}
            onClick={handleDeleteAccount}
          >
            Continuar
          </button>
          <button
            onClick={() => setOpen(false)}
            className={`${primaryBtn} w-full`}
          >
            Cancelar
          </button>
        </div>
      </section>
    </Dialog>
  );
}
