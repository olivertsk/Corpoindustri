import { fxAllBanner } from '@/src/api/BannerApi';
import { EPositionBanner } from '@/src/types/banner';
import BannerSlider from '../home/BannerSlider';

export default async function BannerProduct() {
  const productBanner = await fxAllBanner({
    position: EPositionBanner.Product,
    isClient: true,
  });

  return (
    <div className='rounded-xl overflow-hidden'>
      {productBanner?.length > 0 && (
        <BannerSlider slides={productBanner} showFadeOut={false} />
      )}
    </div>
  );
}
