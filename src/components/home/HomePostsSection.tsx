import { apiUrl } from '@/src/lib/global';
import { TPost } from '@/src/types/post';
import Link from 'next/link';

type HomePostsSectionProps = {
  posts: TPost[];
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').trim();

const imagePath = (image?: string | null) => {
  if (!image) {
    return '';
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  return `${apiUrl}/file/${image}`;
};

export default function HomePostsSection({ posts }: HomePostsSectionProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <section className='container mx-auto px-4 pb-16'>
      <div className='rounded-[28px] overflow-hidden border border-slate-200 bg-white shadow-[0_18px_36px_rgba(12,40,84,0.12)]'>
        <div className='bg-[linear-gradient(105deg,#062a63_0%,#0f4a9b_58%,#2d7dd7_100%)] px-6 py-8 md:px-10'>
          <div className='flex flex-wrap gap-4 items-end justify-between'>
            <div>
              <p className='text-xs uppercase tracking-[0.22em] text-[#ffed00] font-bold'>
                Inspiracion Para Tu Negocio
              </p>
              <h3 className='text-3xl md:text-4xl font-black text-white leading-tight mt-2'>
                Articulos y Recetas para vender mas
              </h3>
              <p className='text-white/85 mt-3 max-w-2xl'>
                Ideas de rotacion, recomendaciones practicas y recetas con
                ingredientes comprables para impulsar tus ventas.
              </p>
            </div>
            <Link
              href='/publicaciones'
              className='bg-[#ffed00] text-slate-900 font-extrabold px-5 py-2.5 rounded-xl hover:bg-yellow-300 transition-colors'
            >
              Ver todas las publicaciones
            </Link>
          </div>
        </div>

        <div className='p-4 md:p-6 grid gap-4 lg:grid-cols-[1.35fr_1fr]'>
          {posts.map((featured) => {
            return (
              <Link
                key={featured.id}
                href={`/publicaciones/${featured.slug}`}
                className='group relative rounded-2xl overflow-hidden min-h-[320px] border border-slate-200'
              >
                {imagePath(featured.coverImage) ? (
                  <div
                    className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105'
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(2,10,24,0.15) 0%, rgba(2,10,24,0.75) 100%), url(${imagePath(featured.coverImage)})`,
                    }}
                  />
                ) : (
                  <div className='absolute inset-0 bg-[linear-gradient(130deg,#0f172a_0%,#1d4ed8_100%)]' />
                )}

                <div className='relative z-10 p-6 h-full flex flex-col justify-end'>
                  <span
                    className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-bold ${
                      featured.type === 'recipe'
                        ? 'bg-emerald-200 text-emerald-900'
                        : 'bg-sky-200 text-sky-900'
                    }`}
                  >
                    {featured.type === 'recipe' ? 'Receta' : 'Articulo'}
                  </span>
                  <h4 className='text-white text-2xl md:text-3xl font-black mt-3 leading-tight'>
                    {featured.title}
                  </h4>
                  <p className='text-white/85 text-sm mt-2 max-w-2xl line-clamp-3'>
                    {featured.excerpt || stripHtml(featured.content || '')}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
