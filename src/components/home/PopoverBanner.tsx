'use client';

import { apiUrl } from '@/src/lib/global';
import { IBanner } from '@/src/types/banner';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

type PopoverBannerProps = {
  banner: IBanner[];
  isOncePopup?: boolean;
};

export default function PopoverBanner({
  banner,
  isOncePopup,
}: PopoverBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const slide = banner[0];

  useEffect(() => {
    if (isOncePopup && slide?.images) {
      const savedImage = localStorage.getItem('oncePopup');
      if (savedImage) {
        if (savedImage === slide.images) return;
      }
      localStorage.setItem('oncePopup', slide.images);
      setShowBanner(true);
    } else {
      setShowBanner(true);
    }
  }, [isOncePopup, slide]);

  if (slide)
    return (
      showBanner && (
        <div className='fixed top-0 left-0 z-[99999999] bg-black/50 h-full flex items-center justify-center flex-col w-full'>
          <div>
            <div className='container flex flex-col'>
              <div className='container flex justify-end mb-4'>
                <button
                  className=' text-white text-3xl font-bold z-10 border-2 p-1 w-8 h-8 flex items-center justify-center rounded-full border-white hover:bg-white hover:text-black transition'
                  onClick={() => setShowBanner(false)}
                >
                  <XMarkIcon />
                </button>
              </div>
              <div>
                <picture className='relative w-full '>
                  <source
                    srcSet={`${apiUrl}/file/${
                      slide.mobileImage || slide.images
                    }`}
                    media='(max-width: 768px)'
                  />
                  <img
                    src={`${apiUrl}/file/${slide.images}`}
                    alt={slide?.description || 'mercado'}
                    style={{
                      objectFit: 'contain',
                      maxHeight: '90vh',
                    }}
                  />
                </picture>
              </div>
            </div>
          </div>
        </div>
      )
    );
}
