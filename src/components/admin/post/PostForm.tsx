'use client';

import { getProducts } from '@/src/api/ProductApi';
import ErrorMessage from '@/src/components/ErrorMessage';
import { inputStlyes, primaryBtn, secondaryBtn } from '@/src/lib/global';
import { TPost, TPostForm } from '@/src/types/post';
import { Product } from '@/src/types/product';
import { Autocomplete, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import Spinner from '../../spinner/Spinner';
import UploadImage from '../../UploadImage';

type ProductOption = Pick<Product, 'id' | 'name' | 'code'>;

const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
});

type PostFormProps = {
  register: UseFormRegister<TPostForm>;
  errors: FieldErrors<TPostForm>;
  watch: UseFormWatch<TPostForm>;
  setValue: UseFormSetValue<TPostForm>;
  initialProducts?: TPost['products'];
  isPending: boolean;
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const toSlug = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

export default function PostForm({
  register,
  errors,
  watch,
  setValue,
  initialProducts,
  isPending,
}: PostFormProps) {
  const [slugEdited, setSlugEdited] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSeoOpen, setIsSeoOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>(
    (initialProducts || []).map((item) => ({
      id: item.id,
      name: item.name,
      code: '',
    })),
  );

  const title = watch('title');
  const type = watch('type');
  const content = watch('content') || '';
  const metaTitle = watch('metaTitle') || '';
  const metaDescription = watch('metaDescription') || '';
  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['link'],
        [{ align: [] }],
        ['clean'],
      ],
    }),
    [],
  );

  const quillFormats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'bullet',
      'blockquote',
      'code-block',
      'link',
      'align',
    ],
    [],
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 350);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!slugEdited) {
      setValue('slug', toSlug(title || ''), {
        shouldValidate: true,
      });
    }
  }, [title, slugEdited, setValue]);

  useEffect(() => {
    setValue(
      'productIds',
      selectedProducts.map((item) => item.id),
    );
  }, [selectedProducts, setValue]);

  useEffect(() => {
    if (type !== 'recipe' && selectedProducts.length > 0) {
      setSelectedProducts([]);
      setValue('productIds', []);
    }
  }, [type, selectedProducts.length, setValue]);

  useEffect(() => {
    if (errors.metaTitle || errors.metaDescription) {
      setIsSeoOpen(true);
    }
  }, [errors.metaTitle, errors.metaDescription]);

  const { data: productsData, isFetching } = useQuery({
    queryKey: ['post-products-search', debouncedQuery],
    queryFn: () =>
      getProducts({
        pag: 1,
        limit: 20,
        search: debouncedQuery,
      }),
    enabled: type === 'recipe' && debouncedQuery.length >= 2,
    refetchOnWindowFocus: false,
  });

  const productOptions = useMemo(() => {
    const optionsFromApi: ProductOption[] =
      productsData?.data.map((item) => ({
        id: item.id,
        name: item.name,
        code: item.code,
      })) || [];

    const uniqueOptions = new Map<string, ProductOption>();
    [...selectedProducts, ...optionsFromApi].forEach((item) => {
      uniqueOptions.set(item.id!, item);
    });

    return Array.from(uniqueOptions.values());
  }, [productsData?.data, selectedProducts]);

  const uploadImageCb = (fileName: string) => setValue('coverImage', fileName);

  return (
    <>
      <div className='grid lg:grid-cols-2 gap-4'>
        <div className='lg:col-span-2'>
          <UploadImage
            callback={uploadImageCb}
            type='square'
            initialValue={watch('coverImage')}
          />
        </div>
        <div>
          <label>
            Tipo
            <select
              className={inputStlyes}
              {...register('type', {
                required: 'Debe seleccionar el tipo de publicación',
              })}
            >
              <option value='article'>Articulo</option>
              <option value='recipe'>Receta</option>
            </select>
          </label>
          {errors.type && <ErrorMessage>{errors.type.message}</ErrorMessage>}
        </div>

        <div>
          <label>
            Estado
            <div className='flex items-center gap-3 mt-2'>
              <input
                type='checkbox'
                className='h-5 w-5 accent-[#1958ac]'
                {...register('status')}
              />
              <span className='text-sm text-slate-600'>
                {watch('status') ? 'Publicado' : 'Borrador'}
              </span>
            </div>
          </label>
        </div>

        <div className='lg:col-span-2'>
          <label>
            Titulo
            <input
              type='text'
              className={inputStlyes}
              {...register('title', {
                required: 'El titulo es obligatorio',
              })}
            />
          </label>
          {errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
        </div>

        <div className='lg:col-span-2'>
          <label>
            Slug
            <input
              type='text'
              className={inputStlyes}
              {...register('slug', {
                required: 'El slug es obligatorio',
                pattern: {
                  value: slugPattern,
                  message:
                    'El slug solo puede contener letras minusculas, numeros y guiones',
                },
                onChange: () => setSlugEdited(true),
              })}
            />
          </label>
          <p className='mt-1 text-xs text-slate-500'>
            Sugerido automaticamente desde el titulo, pero editable.
          </p>
          {errors.slug && <ErrorMessage>{errors.slug.message}</ErrorMessage>}
        </div>

        <div className='lg:col-span-2'>
          <label>
            Extracto
            <textarea
              className={inputStlyes}
              rows={3}
              {...register('excerpt')}
              placeholder='Resumen corto del post...'
            ></textarea>
          </label>
        </div>

        <div className='lg:col-span-2'>
          <label className='block mb-2'>Contenido</label>
          <div
            className='rounded-md overflow-hidden bg-white border border-slate-300'
            suppressHydrationWarning
          >
            <ReactQuill
              theme='snow'
              value={content}
              modules={quillModules}
              formats={quillFormats}
              onChange={(value) => {
                setValue('content', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              className='post-rich-editor'
            />
          </div>
          <input
            type='hidden'
            {...register('content', {
              required: 'El contenido es obligatorio',
            })}
          />
          {errors.content && (
            <ErrorMessage>{errors.content.message}</ErrorMessage>
          )}
        </div>

        {type === 'recipe' && (
          <div className='lg:col-span-2'>
            <label className='block mb-2'>Ingredientes comprables</label>
            <Autocomplete
              multiple
              options={productOptions}
              value={selectedProducts}
              loading={isFetching}
              onChange={(_, value) => setSelectedProducts(value)}
              onInputChange={(_, value) => setQuery(value)}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              getOptionLabel={(option) =>
                option.code ? `${option.name} (${option.code})` : option.name
              }
              filterOptions={(options) => options}
              noOptionsText={
                debouncedQuery.length < 2
                  ? 'Escribe al menos 2 caracteres para buscar productos'
                  : 'No se encontraron productos'
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Buscar productos por nombre...'
                />
              )}
            />
            <input type='hidden' {...register('productIds')} />
            <p className='mt-2 text-xs text-slate-500'>
              Se enviaran al backend como productIds para relacion M:N.
            </p>
          </div>
        )}

        <div className='lg:col-span-2 mt-2'>
          <details
            className='rounded-md border border-slate-300 bg-white'
            open={isSeoOpen}
            onToggle={(event) => setIsSeoOpen(event.currentTarget.open)}
          >
            <summary className='cursor-pointer select-none px-4 py-3 font-semibold text-primary'>
              Configuracion SEO
            </summary>
            <div className='p-4 grid lg:grid-cols-2 gap-4'>
              <div className='lg:col-span-2'>
                <label>
                  Meta Title
                  <input
                    type='text'
                    className={inputStlyes}
                    maxLength={60}
                    placeholder='Harina de Maíz al Mayor | Recetas de Cocina | Corpoindustri'
                    {...register('metaTitle', {
                      required: 'El Meta Title es obligatorio',
                      maxLength: {
                        value: 60,
                        message: 'metaTitle no puede exceder 60 caracteres',
                      },
                    })}
                  />
                </label>
                <p className='text-xs text-slate-500 mt-1'>
                  {metaTitle.length}/60 caracteres
                </p>
                {errors.metaTitle && (
                  <ErrorMessage>{errors.metaTitle.message}</ErrorMessage>
                )}
              </div>

              <div className='lg:col-span-2'>
                <label>
                  Meta Description
                  <textarea
                    className={inputStlyes}
                    rows={3}
                    maxLength={160}
                    placeholder='Descubre la mejor receta para hacer arepas esponjosas con Harina Pan. Compra todos tus ingredientes al mayor en Corpoindustri con los mejores precios de Venezuela.'
                    {...register('metaDescription', {
                      required: 'La Meta Description es obligatoria',
                      maxLength: {
                        value: 160,
                        message:
                          'metaDescription no puede exceder 160 caracteres',
                      },
                    })}
                  ></textarea>
                </label>
                <p className='text-xs text-slate-500 mt-1'>
                  {metaDescription.length}/160 caracteres
                </p>
                {errors.metaDescription && (
                  <ErrorMessage>{errors.metaDescription.message}</ErrorMessage>
                )}
              </div>
            </div>
          </details>
        </div>
      </div>

      <div className='mt-6 space-x-2'>
        {isPending ? (
          <Spinner />
        ) : (
          <>
            <button type='submit' className={primaryBtn}>
              Guardar publicacion
            </button>
            <Link href='/admin/post' type='button' className={secondaryBtn}>
              Cancelar
            </Link>
          </>
        )}
      </div>
    </>
  );
}
