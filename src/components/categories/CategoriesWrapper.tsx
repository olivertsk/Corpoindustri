'use client';

import { ICategory } from '@/src/types/category';
import CategoriesCard from './CategoriesCard';

type CategoriesWrapperProps = {
  categoryData: ICategory[];
};
export default function CategoriesWrapper({ categoryData }: CategoriesWrapperProps) {
  return (
    <div className='-mt-16 z-20 relative'>
      <div className='container mx-auto'>
        <CategoriesCard categoryData={ categoryData }/>
      </div>
    </div>
  );
}
