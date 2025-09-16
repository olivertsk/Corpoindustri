import { updateProduct } from '@/src/api/ProductApi';
import { useBreadcrumb } from '@/src/hooks/useBreadcrumb';
import { Product, TProductForm } from '@/src/types/product';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';

type EditProductFormWrapperProps = {
  product: Product;
};

export default function EditProductFormWrapper({
  product,
}: EditProductFormWrapperProps) {
  console.log('product', product);
  const navigate = useRouter();
  useBreadcrumb('Productos', `Editar Producto: ${product.name}`);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<TProductForm>({
    defaultValues: {
      coverImage: product.coverImage,
      brand: product.brand,
      categoryId: product.categoryId,
      code: product.code,
      departmentId: product.departmentId,
      description: product.description,
      name: product.name,
      price: product.price,
      stock: product.stock,
      taxRate: product.taxRate,
      images: product.images,
      promotionalPrice: product.promotionalPrice,
      priceWithTax: product.priceWithTax
        ? +product.priceWithTax?.toFixed(2)
        : 0,
      status: product.status,
      longDescription: product.longDescription,
      priceBs: product.priceBs,
      promotionalPriceBs: product.promotionalPriceBs,
      priceWithTaxBs: product.priceWithTaxBs,
    },
  });
  const queryClient = useQueryClient();
  const { id } = useParams();

  const handleForm = async (formData: TProductForm) => {
    const response = await updateProduct({
      data: formData,
      id: id as string,
    });
    if (response.success) {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      navigate.replace('/admin/products');
      reset();
      setTimeout(() => {
        toast.success('Producto editado correctamente');
      }, 1000);
    } else {
      response.message.forEach((item: { field: string; message: string }) => {
        if (item.field === 'categoryId') {
          toast.error('Debe seleccionar una categoría para continuar');
        } else if (item.field === 'code') {
          toast.error('El código de producto ya existe');
        } else {
          toast.error(`${item.field} ${item.message}`);
        }
      });
    }
  };

  const handleImageArray = useFieldArray({
    control,
    name: 'images',
    keyName: '_id',
  });

  return (
    <form
      onSubmit={handleSubmit(handleForm)}
      className='bg-white p-4 lg:p-16 rounded-md shadow-lg'
    >
      <ProductForm
        setValue={setValue}
        handleImageArray={handleImageArray}
        watch={watch}
        register={register}
        errors={errors}
      />
    </form>
  );
}
