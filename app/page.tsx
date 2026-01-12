import { fxAllBanner } from '@/src/api/BannerApi';
import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getDepartments } from '@/src/api/DepartmentsApi';
import { getMaps } from '@/src/api/MapApi ';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import InstagramSection from '@/src/components/home/InstagramSection';
import { MapSection } from '@/src/components/home/MapSection';
import PopoverBanner from '@/src/components/home/PopoverBanner';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import TiktokSection from '@/src/components/home/TiktokSection';
import ShowClientSurvey from '@/src/components/survey/ShowClientSurvey';
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

  const result = await Promise.allSettled([
    fxAllBanner({
      position: EPositionBanner.HomePrincipal,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.HomeSecondary,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.HomeTertiary,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.Contact,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.PopupOnce,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.AlwaysPopup,
      isClient: true,
    }),
  ]);

  const principalBannerData: IBanner[] =
    result[0].status === 'fulfilled' ? result[0].value : [];
  const secondaryBannerData: IBanner[] =
    result[1].status === 'fulfilled' ? result[1].value : [];
  const tertiaryBannerData: IBanner[] =
    result[2].status === 'fulfilled' ? result[2].value : [];

  const contactBannerData: IBanner[] =
    result[3].status === 'fulfilled' ? result[3].value : [];
  const popupOnce: IBanner[] =
    result[4].status === 'fulfilled' ? result[4].value : [];
  const alwaysPopup: IBanner[] =
    result[5].status === 'fulfilled' ? result[5].value : [];

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
  console.log('firstHalf', firstHalf);
  console.log('alwaysPopup', alwaysPopup);
  return (
    <>
      <PopoverBanner
        banner={popupOnce.length ? popupOnce : alwaysPopup}
        isOncePopup={!!popupOnce.length}
      />
      <section>
        <ShowClientSurvey />
        {principalBannerData.length && (
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
          {secondaryBannerData.length && (
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
          {tertiaryBannerData.length && (
            <div className='mb-24'>
              <BannerSlider floatingBanner={true} slides={tertiaryBannerData} />
            </div>
          )}
          <div className='space-y-8 '>
            <TiktokSection />
            <InstagramSection />
          </div>
          <MapSection data={mapData.data} />
          {contactBannerData.length > 0 && (
            <div className='mb-24'>
              <BannerSlider
                floatingBanner={true}
                slides={contactBannerData}
                redirectTo='contact'
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
