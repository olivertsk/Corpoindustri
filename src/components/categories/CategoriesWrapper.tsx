'use client';
import { ICategory } from '@/src/types/category';
import CategoriesCard from './CategoriesCard';

type CategoriesWrapperProps = {
  categoryData: ICategory[];
};
export default function CategoriesWrapper({
  categoryData,
}: CategoriesWrapperProps) {
  return (
    <div className='mt-2 md:mt-4 z-20 relative'>
      <div>
        <CategoriesCard categoryData={categoryData} />
      </div>
    </div>
  );
}
