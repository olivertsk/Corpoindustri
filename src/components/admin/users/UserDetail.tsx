import { getOrdersByUser } from '@/src/api/OrderApi';
import { Modal } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Dispatch, SetStateAction } from 'react';
import Spinner from '../../spinner/Spinner';
import { useRouter } from 'next/navigation';
import { translationsOrder } from '@/src/types/order';
import { ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type UserDetailProps = {
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
};

export default function UserDetail({ userId, setUserId }: UserDetailProps) {
  const { data } = useQuery({
    queryKey: ['userDetail', userId],
    queryFn: () => getOrdersByUser(userId!),
    enabled: userId !== null,
    refetchOnWindowFocus: false,
  });

  console.log('data', data);
  const route = useRouter();

  const onClose = () => {
    route.replace('/admin/users');
    setUserId(null);
  };

  return (
    <Modal
      open={userId !== null}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className='bg-white rounded-lg p-4 w-[90%] max-w-2xl max-h-[80vh] overflow-y-auto'>
        {!data ? (
          <Spinner />
        ) : (
          <div>
            <div className='flex justify-between items-center mb-4'>
              <h2>Órdenes del usuario</h2>
              <button>
                <XMarkIcon className='w-6 h-6' onClick={onClose} />
              </button>
            </div>
            {data.data.length === 0 ? (
              <p>El usuario no tiene órdenes.</p>
            ) : (
              <div className='divide-y'>
                {data.data.map((order) => (
                  <Link
                    href={`/admin/orders?orderId=${order.id}`}
                    key={order.id}
                    className='hover:bg-gray-100 p-4 cursor-pointer flex items-center justify-between'
                  >
                    <div>
                      <p>
                        <strong>Código de Orden:</strong> {order.code}
                      </p>
                      <p>
                        <strong>Estado:</strong>{' '}
                        {translationsOrder[order.status]}
                      </p>
                      <p>
                        <strong>Monto:</strong> ${order.amount.toFixed(2)}
                      </p>
                      <p>
                        <strong>Fecha:</strong>{' '}
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <ChevronRightIcon className='w-5 h-5 mt-2 text-gray-500' />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
