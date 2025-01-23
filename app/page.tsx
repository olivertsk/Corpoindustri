import { fxAllBanner } from '@/src/api/BannerApi';
import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getDepartments } from '@/src/api/DepartmentsApi';
import { getMaps } from '@/src/api/MapApi ';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import InstagramSection from '@/src/components/home/InstagramSection';
import { MapSection } from '@/src/components/home/MapSection';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import TiktokSection from '@/src/components/home/TiktokSection';
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
    isClient: true,
  });
  const secondaryBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomeSecondary,
    isClient: true,
  });
  const tertiaryBannerData: IBanner[] = await fxAllBanner({
    position: EPositionBanner.HomeTertiary,
    isClient: true,
  });

  /** Departamentos destacadas para secciones de productos */
  const departamentFilter: DepartmentFilters = {
    isSalient: true,
    product: true,
    isClient: true,
  };

  const mapData: { data: TMap[] } = await getMaps({
    isClient: true,
  });

  const departamentData: { data: Department[] } = await getDepartments(
    departamentFilter
  );

  const half = Math.ceil(departamentData.data.length / 2);
  const firstHalf = departamentData.data.slice(0, half);
  const secondHalf = departamentData.data.slice(half);

  console.log('principalBannerData :>> ', principalBannerData);
  return (
    <>
      <section>
        {principalBannerData && (
          <BannerSlider slides={principalBannerData} showFadeOut={true} />
        )}
        <div className='container mx-auto mb-4'>
          {categoryData && <CategoriesWrapper categoryData={categoryData} />}
          {firstHalf.map((department: Department) => (
            <ProductsSlider
              key={department.id}
              titleSection={department.name}
              products={department.products || []}
              departmentId={department.id}
            />
          ))}
        </div>
        <div className='container mx-auto mb-4'>
          {secondaryBannerData && (
            <BannerSlider floatingBanner={true} slides={secondaryBannerData} />
          )}
          <div className='mt-12'>
            {secondHalf.map((department: Department) => (
              <ProductsSlider
                products={department.products || []}
                key={department.id}
                titleSection={department.name}
                departmentId={department.id}
              />
            ))}
          </div>
        </div>
        <div className='container mx-auto mt-4 mb-4 p-4'>
          {tertiaryBannerData && (
            <div className='mb-24'>
              <BannerSlider floatingBanner={true} slides={tertiaryBannerData} />
            </div>
          )}
          <div className='space-y-8 '>
            <TiktokSection />
            <InstagramSection />
          </div>
          <MapSection data={mapData.data} />
        </div>
      </section>
    </>
  );
}
