import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Image from 'next/image';

import { getComboBySlug } from '@/src/api/ComboApi';
import BackBtn from '@/src/components/BackBtn';
import ImagePreview from '@/src/components/products/ImagePreview';
import AddComboToCart from '@/src/components/combos/AddComboToCart';
import { apiUrl } from '@/src/lib/global';
import {
  normalizeAmounts,
  normalizeAmountsBs,
} from '@/src/utils/normalizeAmounts';

type Props = {
  params: Promise<{ slug: string }>;
};

const getComboFromSlug = async (slug: string) => {
  console.log('slug :>> ', slug);
  if (!slug) {
    notFound();
  }
  const combo = await getComboBySlug(slug);
  console.log('combo :>> ', combo);

  if (!combo?.id) {
    notFound();
  }
  return combo;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const combo = await getComboFromSlug(slug);
  const description = combo.description || '';
  const comboImage = combo.coverImage
    ? `${apiUrl}/file/${combo.coverImage}`
    : '';

  return {
    title: combo.name,
    description,
    alternates: {
      canonical: `/combos/${combo.slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      images: comboImage ? [comboImage] : [],
      description,
      title: combo.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: combo.name,
      description,
      images: comboImage ? [comboImage] : [],
    },
  };
}

export default async function ComboShowBySlugPage({ params }: Props) {
  const { slug } = await params;
  const combo = await getComboFromSlug(slug);
  console.log('combo :>> ', combo);
  if (combo.slug && slug !== combo.slug) {
    permanentRedirect(`/combos/${combo.slug}`);
  }

  const comboImage = combo.coverImage
    ? `${apiUrl}/file/${combo.coverImage}`
    : '';

  const galleryImages = combo.coverImage
    ? [
        {
          id: 'cover',
          alt: combo.name,
          isVideo: false,
          file: combo.coverImage,
          productId: '',
          position: 1,
        },
      ]
    : [];

  const products = combo.products || [];

  const comboJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: combo.name,
    image: comboImage ? [comboImage] : [],
    description: combo.description || combo.name,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: combo.price,
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `https://corpoindustri.com/combos/${combo.slug}`,
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comboJsonLd),
        }}
      />
      <div className='container mx-auto py-3 flex lg:flex-row flex-col'>
        <BackBtn />
      </div>
      <main className='container mx-auto bg-white py-4 rounded-xl shadow-sm'>
        <div className='grid grid-cols-3 gap-8 lg:gap-0'>
          <div className='col-span-3 lg:col-span-2'>
            <ImagePreview images={galleryImages} alt={combo.name} />

            {combo.description && (
              <div className='pb-8 px-8 mt-8'>
                <h4 className='text-2xl font-bold mb-4'>Detalles del combo</h4>
                <div className='whitespace-pre-wrap text-slate-700'>
                  {combo.description}
                </div>
              </div>
            )}

            {/* Productos incluidos en el combo */}
            {products.length > 0 && (
              <div className='pb-8 px-8 mt-2'>
                <h4 className='text-2xl font-bold mb-4'>
                  Productos incluidos en este combo
                </h4>
                <div className='space-y-3'>
                  {products.map((item) => (
                    <div
                      key={item.productId}
                      className='flex items-center gap-4 border border-slate-200 rounded-xl p-3'
                    >
                      <Image
                        width={64}
                        height={64}
                        alt={item.productDetail?.name || 'Producto'}
                        src={
                          item.productDetail?.coverImage ||
                          item.productDetail?.images?.[0]?.file
                            ? `${apiUrl}/file/${item.productDetail?.coverImage || item.productDetail?.images?.[0]?.file}`
                            : '/logo.png'
                        }
                        className='w-16 h-16 rounded-lg object-cover border border-slate-100 bg-white'
                      />
                      <div className='flex-1'>
                        <p className='font-bold text-slate-800'>
                          {item.productDetail?.name}
                        </p>
                      </div>
                      <span className='font-bold text-primary whitespace-nowrap'>
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className='col-span-3 lg:col-span-1 lg:px-8'>
            <div className='border rounded-xl p-4'>
              <h4 className='font-bold text-2xl mb-4'>{combo.name}</h4>
              <div className='mb-4'>
                <p className='text-2xl font-black text-primary'>
                  {normalizeAmounts(combo.price)}
                </p>
                {!!combo.priceBs && (
                  <p className='text-base font-semibold text-slate-500'>
                    {normalizeAmountsBs(combo.priceBs)}
                  </p>
                )}
              </div>
              <AddComboToCart combo={combo} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
