import { fxAllBanner } from '@/src/api/BannerApi';
import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getDepartments } from '@/src/api/DepartmentsApi';
import { getMaps } from '@/src/api/MapApi ';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import { MapSection } from '@/src/components/home/MapSection';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import { EPositionBanner, IBanner } from '@/src/types/banner';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Department, DepartmentFilters } from '@/src/types/department';
import { TMap } from '@/src/types/map';

export default async function Home() {
  /** Categorias destacadas para carrousel */
  const categoryFilter: ICategoryFilter = {
    isSalient: true,
  };
  const categoryData: ICategory[] = await fxAllCategories(categoryFilter);
  const principalBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomePrincipal,
  });
  const secondaryBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomeSecondary,
  });

  /** Departamentos destacadas para secciones de productos */
  const departamentFilter: DepartmentFilters = {
    isSalient: true,
    product: true,
  };

  const mapData: { data: TMap[] } = await getMaps({});
  const departamentData: { data: Department[] } = await getDepartments(
    departamentFilter
  );
  const half = Math.ceil(departamentData.data.length / 2);
  const firstHalf = departamentData.data.slice(0, half);
  const secondHalf = departamentData.data.slice(half);

  return (
    <section>
      <div className='container mx-auto mb-4'>
        {principalBannerData && (
          <BannerSlider slides={principalBannerData} showFadeOut={false} />
        )}

        {categoryData && <CategoriesWrapper categoryData={categoryData} />}
        {firstHalf.map((department: Department) => (
          <ProductsSlider
            key={department.id}
            titleSection={department.name}
            products={department.products || []}
          />
        ))}
      </div>
      <div className='container mx-auto mb-4'>
        {secondaryBannerData && <BannerSlider slides={secondaryBannerData} />}
        {secondHalf.map((department: Department) => (
          <ProductsSlider
            products={department.products || []}
            key={department.id}
            titleSection={department.name}
          />
        ))}
      </div>
      <div className='container mx-auto mb-4'>
        <MapSection data={mapData.data} />
      </div>
    </section>
  );
}
