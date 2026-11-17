'use client';
import { getCombo } from '@/src/api/ComboApi';
import EditComboFormWrapper from '@/src/components/admin/combos/EditComboFormWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { Combo } from '@/src/types/combo';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditComboPage() {
  useBreadcrumb('Combos', 'Editar Combo');
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<Combo | null>(null);
  useEffect(() => {
    getCombo(id).then((combo) => setData(combo));
  }, []);

  if (!data) {
    return <Spinner />;
  }

  return <EditComboFormWrapper combo={data} />;
}
