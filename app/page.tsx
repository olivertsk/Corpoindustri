import { fxAllBanner } from '@/src/api/BannerApi';
import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getDepartments } from '@/src/api/DepartmentsApi';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import { EPositionBanner, IBanner } from '@/src/types/banner';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Department, DepartmentFilters } from '@/src/types/department';

export default async function Home() {
  /** Categorias destacadas para carrousel */
  const categoryFilter: ICategoryFilter = {
    isSalient: true,
  };
  const categoryData: ICategory[] = await fxAllCategories(categoryFilter);
  const principalBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomePrincipal
  });
  const secondaryBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomeSecondary
  });

  /** Departamentos destacadas para secciones de productos */
  const departamentFilter: DepartmentFilters = {
    isSalient: true,
    product: true,
  };

  const departamentData: { data: Department[] } = await getDepartments(departamentFilter);
  const half = Math.ceil(departamentData.data.length / 2);
  const firstHalf = departamentData.data.slice(0, half);
  const secondHalf = departamentData.data.slice(half);

  return (
    <section>
      {
        principalBannerData &&
        <BannerSlider
          slides={principalBannerData}
          showFadeOut={true}
        />
      }

      {categoryData && <CategoriesWrapper categoryData={categoryData} />}
      <div className='container mx-auto mb-4'>
        {firstHalf.map((department: Department) => (
          <ProductsSlider key={department.id} titleSection={department.name} />
        ))}
      </div>
      {
        secondaryBannerData && 
          <BannerSlider
          slides={secondaryBannerData}
        />
      }
      <div className='container mx-auto mb-4'>
        {secondHalf.map((department: Department) => (
          <ProductsSlider key={department.id} titleSection={department.name} />
        ))}
      </div>
    </section>
  );
}
