import { fxAllCategories } from '@/src/api/CategoriesApi';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import { ICategory, ICategoryFilter } from '@/src/types/category';

export default async function Home() {
  const categoryFilter: ICategoryFilter = {
    isSalient: true,
  };
  const categoryData: ICategory[] = await fxAllCategories(categoryFilter);

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
        <ProductsSlider titleSection='Viveres' />
        <ProductsSlider titleSection='Limpieza' />
        <ProductsSlider titleSection='Confiteria' />
      </div>
      <BannerSlider
        slides={[
          'https://img.freepik.com/foto-gratis/concepto-viaje-primer-plano-retrato-joven-hermosa-atractiva-chica-pelirroja-sombrero-moda-gafas-sol_1258-126774.jpg?t=st=1731374393~exp=1731377993~hmac=cb8f1c9458ccdd7098355591e6557973013099446a0f871c9a478709828cf310&w=1380',
        ]}
      />
      <div className='container mx-auto mb-4'>
        <ProductsSlider titleSection='Productos Mas Vendidos' />
      </div>
    </section>
  );
}
