'use client';

import {
  apiUrl,
  inputStlyes,
  primaryBtn,
  secondaryBtn,
} from '@/src/lib/global';
import { TComboForm } from '@/src/types/combo';
import {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/src/api/ProductApi';
import UploadImage from '../../UploadImage';
import { slugify } from '@/src/utils/productSlug';
import { Product } from '@/src/types/product';
import {
  normalizeAmounts,
  normalizeAmountsBs,
} from '@/src/utils/normalizeAmounts';

type ComboFormProps = {
  register: UseFormRegister<TComboForm>;
  errors: FieldErrors<TComboForm>;
  handleProductsArray: UseFieldArrayReturn<TComboForm, 'products', '_pid'>;
  watch: UseFormWatch<TComboForm>;
  setValue: UseFormSetValue<TComboForm>;
  isSubmitting?: boolean;
};

export default function ComboForm({
  register,
  errors,
  handleProductsArray,
  watch,
  setValue,
  isSubmitting = false,
}: ComboFormProps) {
  const navigate = useRouter();
  const [search, setSearch] = useState('');
  const { data: searchResults, isFetching } = useQuery({
    queryKey: ['comboProductSearch', search],
    queryFn: () => getProducts({ search, limit: 10, pag: 1 }),
    enabled: search.trim().length > 1,
    refetchOnWindowFocus: false,
  });

  /** Recalcula price (USD) y priceBs sumando precio x cantidad de cada producto */
  const recalcPrices = (products: TComboForm['products']) => {
    const totalUsd = products.reduce(
      (acc, item) =>
        acc + (item.productDetail?.price || 0) * (item.quantity || 0),
      0,
    );
    const totalBs = products.reduce(
      (acc, item) =>
        acc + (item.productDetail?.priceBs || 0) * (item.quantity || 0),
      0,
    );
    setValue('price', Number(totalUsd.toFixed(2)));
    setValue('priceBs', Number(totalBs.toFixed(2)));
  };

  const handleAddProduct = (product: Product) => {
    if (!product.id) return;
    const current = watch('products') || [];
    if (current.some((p) => p.productId === product.id)) return;
    const next = [
      ...current,
      { productId: product.id, quantity: 1, productDetail: product },
    ];
    handleProductsArray.append({
      productId: product.id,
      quantity: 1,
      productDetail: product,
    });
    recalcPrices(next);
    setSearch('');
  };

  const handleRemoveProduct = (index: number) => {
    const current = watch('products') || [];
    const next = current.filter((_, i) => i !== index);
    handleProductsArray.remove(index);
    recalcPrices(next);
  };

  const handleChangeQuantity = (index: number, value: number) => {
    const quantity = value < 1 ? 1 : value;
    setValue(`products.${index}.quantity`, quantity);
    const current = watch('products') || [];
    recalcPrices(current);
  };

  const uploadImageCb = (fileName: string) => setValue('coverImage', fileName);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue('name', e.target.value);
    setValue('slug', slugify(e.target.value));
  };

  const products = watch('products') || [];

  return (
    <>
      <div className='grid lg:grid-cols-2 gap-4 mb-8'>
        <div className='col-span-2'>
          <h4 className='text-center font-bold mb-4 text-xl'>
            Imagen del combo
          </h4>
          <UploadImage
            callback={uploadImageCb}
            type='square'
            initialValue={watch('coverImage') || ''}
          />
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-4'>
        <div>
          <label htmlFor=''>
            Nombre
            <input
              {...register('name', {
                required: 'Este campo es requerido',
              })}
              onChange={handleNameChange}
              type='text'
              className={inputStlyes}
            />
          </label>
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div>
          <label htmlFor=''>
            Slug (URL)
            <input
              {...register('slug', {
                required: 'Este campo es requerido',
              })}
              type='text'
              className={inputStlyes}
            />
          </label>
          {errors.slug && <ErrorMessage>{errors.slug.message}</ErrorMessage>}
        </div>

        {/* Selector de productos */}
        <div className='col-span-2 border border-slate-300 rounded-md p-6'>
          <h4 className='font-bold mb-2'>Productos del combo</h4>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar producto por nombre...'
              className={inputStlyes}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search.trim().length > 1 && (
              <div className='absolute z-20 bg-white border border-slate-200 rounded-md w-full mt-1 max-h-72 overflow-auto shadow-lg'>
                {isFetching && (
                  <p className='p-3 text-sm text-slate-500'>Buscando...</p>
                )}
                {!isFetching && searchResults?.data.length === 0 && (
                  <p className='p-3 text-sm text-slate-500'>
                    No se encontraron productos
                  </p>
                )}
                {searchResults?.data.map((product) => (
                  <button
                    key={product.id}
                    type='button'
                    onClick={() => handleAddProduct(product)}
                    className='flex items-center gap-3 w-full p-2 hover:bg-slate-100 text-left'
                  >
                    <Image
                      width={40}
                      height={40}
                      alt={product.name}
                      src={
                        product.coverImage || product.images?.[0]?.file
                          ? `${apiUrl}/file/${product.coverImage || product.images[0]?.file}`
                          : '/logo.png'
                      }
                      className='rounded object-cover w-10 h-10'
                      loading='lazy'
                    />
                    <span className='flex-1 text-sm'>{product.name}</span>
                    <span className='text-xs text-slate-400'>
                      {product.code}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className='mt-4 space-y-2'>
            {products.length === 0 && (
              <p className='text-sm text-slate-400'>
                Agrega productos al combo usando el buscador.
              </p>
            )}
            {handleProductsArray.fields.map((field, index) => {
              const detail = products[index]?.productDetail;
              return (
                <div
                  key={field._pid}
                  className='flex items-center gap-3 border border-slate-200 rounded-md p-2'
                >
                  <Image
                    width={48}
                    height={48}
                    alt={detail?.name || 'Producto'}
                    src={
                      detail?.coverImage || detail?.images?.[0]?.file
                        ? `${apiUrl}/file/${detail?.coverImage || detail?.images?.[0]?.file}`
                        : '/logo.png'
                    }
                    className='rounded object-cover w-12 h-12'
                    loading='lazy'
                  />
                  <div className='flex-1'>
                    <p className='text-sm font-semibold'>{detail?.name}</p>
                    <p className='text-xs text-slate-400'>{detail?.code}</p>
                    <p className='text-xs text-slate-400'>
                      {normalizeAmounts(detail?.price || 0)}
                    </p>
                    <p className='text-xs text-slate-400'>
                      {normalizeAmountsBs(detail?.priceBs || 0)}
                    </p>
                  </div>
                  <label className='text-xs text-slate-500'>
                    Cantidad
                    <input
                      type='number'
                      min={1}
                      className={`${inputStlyes} w-24`}
                      value={products[index]?.quantity ?? 1}
                      onChange={(e) =>
                        handleChangeQuantity(index, Number(e.target.value))
                      }
                    />
                  </label>
                  <button
                    type='button'
                    onClick={() => handleRemoveProduct(index)}
                    className='bg-accent-100 rounded-full p-2'
                  >
                    <TrashIcon className='w-4' />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Precios (auto-sumados, editables) */}
        <div className='grid lg:grid-cols-2 col-span-2 gap-4'>
          <div>
            <label htmlFor=''>
              Precio (USD) — suma automática
              <input
                {...register('price', {
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                step='0.01'
                className={inputStlyes}
              />
            </label>
            {errors.price && (
              <ErrorMessage>{errors.price.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Precio (Bs) — suma automática
              <input
                {...register('priceBs', {
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                step='0.01'
                className={inputStlyes}
              />
            </label>
          </div>
        </div>

        <div>
          <label htmlFor=''>
            Estatus
            <select
              {...register('status', {
                required: 'Este campo es requerido',
              })}
              className={inputStlyes}
            >
              <option value=''>Selecciona un Estatus</option>
              <option value='true'>Activo</option>
              <option value='false'>Inactivo</option>
            </select>
          </label>
          {errors.status && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </div>

        <div className='col-span-2'>
          <label htmlFor=''>
            Descripción
            <textarea
              {...register('description')}
              className={`${inputStlyes} resize-none min-h-[150px]`}
            />
          </label>
        </div>
      </div>

      <div className='flex justify-center gap-2 mt-8'>
        <button
          className={`${primaryBtn} flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`}
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <svg
              className='animate-spin h-4 w-4'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z'
              />
            </svg>
          )}
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <button
          onClick={() => navigate.push('/admin/combos')}
          type='button'
          disabled={isSubmitting}
          className={`${secondaryBtn} disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          Cancelar
        </button>
      </div>
    </>
  );
}
