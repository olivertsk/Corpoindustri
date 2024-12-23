import {
  apiUrl,
  inputStlyes,
  primaryBtn,
  secondaryBtn,
} from '@/src/lib/global';
import { TProductForm } from '@/src/types/product';
import {
  FieldErrors,
  UseFieldArrayReturn,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';
import { ChangeEvent } from 'react';
import { deleteFile, uploadFile } from '@/src/api/FileApi';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/src/api/DepartmentsApi';
import Spinner from '../../spinner/Spinner';
import { getCategories } from '@/src/api/CategoriesApi';
import UploadImage from '../../UploadImage';

type ProductFormProps = {
  register: UseFormRegister<TProductForm>;
  errors: FieldErrors<TProductForm>;
  handleImageArray: UseFieldArrayReturn<TProductForm, 'images', '_id'>;
  watch: UseFormWatch<TProductForm>;
  setValue: UseFormSetValue<TProductForm>;
};

export default function ProductForm({
  register,
  errors,
  handleImageArray,
  watch,
  setValue,
}: ProductFormProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['allDepartments'],
    queryFn: () => getDepartments(),
    refetchOnWindowFocus: false,
  });

  const departmentId = watch('departmentId');
  console.log('departmentId :>> ', departmentId);
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: [`allCategories${departmentId}`],
    queryFn: () =>
      getCategories({
        departmentId: departmentId!,
      }),
    enabled: !!departmentId,
    refetchOnWindowFocus: false,
  });

  const navigate = useRouter();

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (const key in files) {
        const element = files[key];
        const file = await uploadFile(element);
        if (file && file?.fileName[0]) {
          handleImageArray.append({
            alt: `Imagen de ${watch('name')}`,
            file: file.fileName[0],
            isVideo: false,
            position: handleImageArray.fields.length + 1,
          });
        }
      }
    }
    e.target.value = '';
  };

  const handleRemoveFile = async (index: number) => {
    const file = handleImageArray.fields[index].file;
    if (await deleteFile(file)) {
      handleImageArray.remove(index);
    }
  };

  const uploadImageCb = (fileName: string) => setValue('coverImage', fileName);

  if (isLoading) {
    return <Spinner />;
  }

  if (data)
    return (
      <>
        <div className='grid lg:grid-cols-2 gap-4 mb-8'>
          <div className='col-span-2'>
            <h4 className='text-center font-bold mb-4 text-xl'>
              Imagen Miniatura
            </h4>
            <UploadImage
              callback={uploadImageCb}
              type='square'
              initialValue={watch('coverImage')}
            />
          </div>
          <div>
            <label htmlFor='upload'>
              Subir Imagenes del producto
              <input
                id='upload'
                type='file'
                className={inputStlyes}
                onChange={handleChangeFile}
              />
            </label>
          </div>
          <div className='flex flex-wrap col-span-2'>
            {handleImageArray.fields.map((item, index) => (
              <div key={item.file} className='relative group'>
                <Image
                  width={150}
                  height={150}
                  alt={item.alt}
                  src={`${apiUrl}/file/${item.file}`}
                  className='rounded-md'
                />
                <button
                  onClick={() => handleRemoveFile(index)}
                  type='button'
                  className='absolute top-1.5 right-1.5 z-10 bg-accent-100 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  <TrashIcon className='w-4' />
                </button>
              </div>
            ))}
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
                type='text'
                className={inputStlyes}
              />
            </label>
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor=''>
              Código
              <input
                {...register('code', {
                  required: 'Este campo es requerido',
                })}
                type='text'
                className={inputStlyes}
              />
            </label>
            {errors.code && <ErrorMessage>{errors.code.message}</ErrorMessage>}
          </div>
          <div>
            <label htmlFor=''>
              Departamento
              <select
                className={inputStlyes}
                {...register('departmentId', {
                  required: 'Este campo es requerido',
                })}
              >
                <option value=''>Seleccionar</option>
                {data.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            {errors.departmentId && (
              <ErrorMessage>{errors.departmentId.message}</ErrorMessage>
            )}
          </div>
          <div>
            {isLoadingCategories && (
              <p className='mt-8 text-slate-500'>Cargando...</p>
            )}
            {!isLoadingCategories && categories?.data.length === 0 && (
              <p className='mt-8 text-slate-500'>
                No existen categorias para este departamento
              </p>
            )}
            {!isLoadingCategories && categories?.data.length !== 0 && (
              <label htmlFor=''>
                Categoria
                <select
                  className={inputStlyes}
                  {...register('categoryId', {
                    required: 'Este campo es requerido',
                  })}
                >
                  <option value=''>Seleccionar</option>
                  {categories?.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            {errors.categoryId && (
              <ErrorMessage>{errors.categoryId.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Precio
              <input
                {...register('price', {
                  required: 'Este campo es requerido',
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
              Precio Promocional
              <input
                {...register('promotionalPrice', {
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                step='0.01'
                className={inputStlyes}
              />
            </label>
            {errors.promotionalPrice && (
              <ErrorMessage>{errors.promotionalPrice.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Precio con Tax
              <input
                {...register('priceWithTax', {
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                step='0.01'
                className={inputStlyes}
              />
            </label>
            {errors.priceWithTax && (
              <ErrorMessage>{errors.priceWithTax.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Tax
              <input
                {...register('taxRate', {
                  required: 'Este campo es requerido',
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                className={inputStlyes}
              />
            </label>
            {errors.taxRate && (
              <ErrorMessage>{errors.taxRate.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Marca
              <input
                {...register('brand', {
                  required: 'Este campo es requerido',
                })}
                type='text'
                className={inputStlyes}
              />
            </label>
            {errors.brand && (
              <ErrorMessage>{errors.brand.message}</ErrorMessage>
            )}
          </div>
          <div>
            <label htmlFor=''>
              Inventario
              <input
                {...register('stock', {
                  required: 'Este campo es requerido',
                  setValueAs: (value) => (value ? Number(value) : 0),
                })}
                type='number'
                className={inputStlyes}
              />
            </label>
            {errors.stock && (
              <ErrorMessage>{errors.stock.message}</ErrorMessage>
            )}
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
              Descripción corta
              <textarea
                {...register('description', {
                  required: 'Este campo es requerido',
                })}
                className={`${inputStlyes} resize-none min-h-[150px]`}
              />
            </label>
            {errors.description && (
              <ErrorMessage>{errors.description.message}</ErrorMessage>
            )}
          </div>
          <div className='col-span-2'>
            <label htmlFor=''>
              Descripción Larga
              <textarea
                {...register('longDescription')}
                className={`${inputStlyes} resize-none min-h-[250px]`}
              />
            </label>
            {errors.longDescription && (
              <ErrorMessage>{errors.longDescription.message}</ErrorMessage>
            )}
          </div>
        </div>
        <div className='flex justify-center gap-2 mt-8'>
          <button className={primaryBtn}>Guardar</button>
          <button
            onClick={() => navigate.push('/admin/products')}
            type='button'
            className={secondaryBtn}
          >
            Cancelar
          </button>
        </div>
      </>
    );
}
