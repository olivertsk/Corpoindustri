'use client';

import { useState } from 'react';
import Image from 'next/image';
import { apiUrl } from '@/src/lib/global';
import { Product } from '@/src/types/product';

export default function ImagePreview({
  images,
  alt,
}: {
  images: Product['images'];
  alt: string;
}) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.file);

  return (
    <div className='flex flex-wrap gap-4 lg:gap-0'>
      <aside className='order-2 lg:order-1 w-full lg:max-w-[130px] px-4 lg:space-y-4 flex lg:block gap-4 overflow-auto'>
        {images.map((image) => (
          <div
            key={image.id}
            className={`border-2 rounded-md min-w-[85px] w-[85px] ${
              selectedImage === image.file && 'border-accent-100'
            } cursor-pointer overflow-hidden transition-colors`}
            onClick={() => setSelectedImage(image.file)}
          >
            <Image
              width={200}
              height={200}
              src={`${apiUrl}/file/${image.file}`}
              alt={alt}
              style={{
                width: '85px',
                minWidth: '85px',
                objectFit: 'cover',
                height: '85px',
              }}
            />
          </div>
        ))}
      </aside>
      <div className='order-1 lg:order-2  flex px-4 lg:px-0  flex-1 lg:border rounded-xl '>
        {selectedImage ? (
          <Image
            width={2048}
            height={0}
            src={`${apiUrl}/file/${selectedImage}`}
            alt={alt}
            style={{
              width: '100%',
              height: '450px',
              objectFit: 'contain',
              aspectRatio: '1/1',
            }}
            className='rounded-xl overflow-hidden '
          />
        ) : (
          <Image
            width={2048}
            height={0}
            src={`/logo.png`}
            alt={alt}
            style={{
              width: '100%',
              height: '450px',
              objectFit: 'contain',
              aspectRatio: '1/1',
            }}
            className='rounded-xl overflow-hidden '
          />
        )}
      </div>
    </div>
  );
}
