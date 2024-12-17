import { ReactNode } from 'react';

export default function Heading({ children }: { children: ReactNode }) {
  return <h4 className='font-bold text-slate-600 text-3xl'>{children}</h4>;
}
