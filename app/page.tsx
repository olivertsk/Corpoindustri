import BannerSlider from '@/components/home/BannerSlider';
import ProductsSlider from '@/components/home/ProductsSlider';

export default function Home() {
  return (
    <section>
      <BannerSlider />
      <div className='container mx-auto mb-4'>
        <ProductsSlider />
      </div>
    </section>
  );
}
