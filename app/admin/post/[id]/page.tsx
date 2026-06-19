'use client';

import { getPost } from '@/src/api/PostApi';
import EditPostFormWrapper from '@/src/components/admin/post/EditPostFormWrapper';
import Spinner from '@/src/components/spinner/Spinner';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { TPost } from '@/src/types/post';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function EditPostPage() {
  useBreadcrumb('Publicaciones', 'Editar publicacion');

  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<TPost | null>(null);

  useEffect(() => {
    getPost(id).then((response) => setData(response));
  }, [id]);

  console.log('data :>> ', data);

  if (!data) {
    return <Spinner />;
  }

  return <EditPostFormWrapper post={data} />;
}
