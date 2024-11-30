import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getHomeDepartments } from '@/src/api/DepartmentsApi';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Department, DepartmentFilters } from '@/src/types/department';

export default async function Home() {
  /** Categorias destacadas para carrousel */
  const categoryFilter: ICategoryFilter = {
    isSalient: true,
  };
  const categoryData: ICategory[] = await fxAllCategories(categoryFilter);

  /** Departamentos destacadas para secciones de productos */
  const departamentFilter: DepartmentFilters = {
    isSalient: true,
    product: true,
  };

  const departamentData: Department[] = await getHomeDepartments(
    departamentFilter
  );
  console.log('departamentData :>> ', departamentData);
  const half = Math.ceil(departamentData.length / 2);
  const firstHalf = departamentData.slice(0, half);
  const secondHalf = departamentData.slice(half);
  return (
    <section>
      <BannerSlider
        slides={[
          'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/4a/d3/38/inside-mercado.jpg?w=1200&h=-1&s=1',
        ]}
        showFadeOut={true}
      />
      {categoryData && <CategoriesWrapper categoryData={categoryData} />}
      <div className='container mx-auto mb-4'>
        {firstHalf.map((department: Department) => (
          <ProductsSlider key={department.id} titleSection={department.name} />
        ))}
      </div>
      <BannerSlider
        slides={[
          'https://img.freepik.com/foto-gratis/concepto-viaje-primer-plano-retrato-joven-hermosa-atractiva-chica-pelirroja-sombrero-moda-gafas-sol_1258-126774.jpg?t=st=1731374393~exp=1731377993~hmac=cb8f1c9458ccdd7098355591e6557973013099446a0f871c9a478709828cf310&w=1380',
        ]}
      />
      <div className='container mx-auto mb-4'>
        {secondHalf.map((department: Department) => (
          <ProductsSlider key={department.id} titleSection={department.name} />
        ))}
      </div>
    </section>
  );
}
