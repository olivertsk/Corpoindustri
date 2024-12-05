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
    <div className='flex'>
      <aside className='max-w-[100px] px-4 space-y-4'>
        {images.map((image) => (
          <div
            key={image.id}
            className={`border-2 rounded-md ${
              selectedImage === image.file && 'border-accent-100'
            } cursor-pointer overflow-hidden transition-colors`}
            onClick={() => setSelectedImage(image.file)}
          >
            <Image
              width={2048}
              height={0}
              src={`${apiUrl}/file/${image.file}`}
              alt={alt}
              style={{
                width: '100%',
              }}
            />
          </div>
        ))}
      </aside>
      <div>
        <Image
          width={2048}
          height={0}
          src={`${apiUrl}/file/${selectedImage}`}
          alt={alt}
          style={{
            width: '100%',
          }}
          className='rounded-xl'
        />
      </div>
    </div>
  );
}
