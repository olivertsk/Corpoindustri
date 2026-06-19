import { getPosts } from '@/src/api/PostApi';
import { apiUrl } from '@/src/lib/global';
import { TPost } from '@/src/types/post';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Publicaciones y Recetas',
  description:
    'Articulos y recetas de Corpoindustri para impulsar ventas y mejorar rotacion de inventario.',
};

const imagePath = (image?: string | null) => {
  if (!image) {
    return '';
  }
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  return `${apiUrl}/file/${image}`;
};

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').trim();

export default async function PublicacionesPage() {
  const response = await getPosts({ pag: 1, limit: 30 });
  const posts: TPost[] = response.data.filter((item) => item.status);

  return (
    <main className='container mx-auto px-4 py-10'>
      <div className='mb-8'>
        <p className='text-xs font-bold uppercase tracking-[0.2em] text-primary'>
          Contenido Comercial
        </p>
        <h1 className='text-4xl font-black text-slate-900 mt-2'>
          Publicaciones para tu negocio
        </h1>
        <p className='text-slate-600 mt-3 max-w-2xl'>
          Aprende con articulos y recetas diseñadas para mejorar compras,
          exhibicion y rentabilidad.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => {
          return (
            <Link
              key={post.id}
              href={`/publicaciones/${post.slug}`}
              className='rounded-2xl overflow-hidden border border-slate-200 bg-white hover:shadow-lg transition-shadow'
            >
              {imagePath(post.coverImage) ? (
                <div
                  className='h-48 bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${imagePath(post.coverImage)})`,
                  }}
                />
              ) : (
                <div className='h-48 bg-[linear-gradient(125deg,#0f172a,#1d4ed8)]' />
              )}
              <div className='p-4'>
                <span
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ${
                    post.type === 'recipe'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-sky-100 text-sky-800'
                  }`}
                >
                  {post.type === 'recipe' ? 'Receta' : 'Articulo'}
                </span>
                <h2 className='mt-2 text-xl font-extrabold text-slate-800 line-clamp-2'>
                  {post.title}
                </h2>
                <p className='mt-2 text-sm text-slate-600 line-clamp-3'>
                  {post.excerpt || stripHtml(post.content || '')}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
