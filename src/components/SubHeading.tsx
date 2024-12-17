import { ReactNode } from 'react';

export default function SubHeading({ children }: { children: ReactNode }) {
  return <h6 className='font-normal mt-1 text-lg'>{children}</h6>;
}
