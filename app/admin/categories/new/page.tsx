'use client';

import CategoryForm from '@/src/components/admin/categories/CategoryForm';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';

export default function NewCategory() {
  useBreadcrumb('Categorías', 'Nueva categoría');

  return (
    <form>
      <CategoryForm />
    </form>
  );
}
