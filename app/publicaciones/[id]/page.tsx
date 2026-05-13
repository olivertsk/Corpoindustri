import { getPostBySlug } from '@/src/api/PostApi';
import { apiUrl } from '@/src/lib/global';
import { TPost } from '@/src/types/post';
import { buildProductSlug } from '@/src/utils/productSlug';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ id: string }>;
};

const normalizePostContent = (value?: string | null) => {
  if (!value) {
    return '';
  }

  if (!value.includes('&lt;') && !value.includes('&gt;')) {
    return value;
  }

  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&');
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostBySlug(id);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || '',
    alternates: {
      canonical: `/publicaciones/${id}`,
    },
  };
}

export default async function PublicacionDetailPage({ params }: Props) {
  const { id } = await params;

  let post: TPost;
  try {
    post = await getPostBySlug(id);
    console.log('post :>> ', post);
  } catch {
    notFound();
  }

  if (!post || !post.status) {
    notFound();
  }

  const renderedContent = normalizePostContent(post.content);

  return (
    <main className='container mx-auto px-4 py-10'>
      <Link
        href='/publicaciones'
        className='text-sm font-bold text-primary hover:text-primaryHover transition-colors'
      >
        Volver a publicaciones
      </Link>

      <article className='section-shell border border-white/80 rounded-3xl p-6 lg:p-10 mt-4'>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${
            post.type === 'recipe'
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-sky-100 text-sky-800'
          }`}
        >
          {post.type === 'recipe' ? 'Receta' : 'Articulo'}
        </span>
        <h1 className='text-4xl font-black text-slate-900 mt-3 leading-tight'>
          {post.title}
        </h1>

        {imagePath(post.coverImage) ? (
          <div
            className='mt-6 h-[320px] rounded-2xl bg-cover bg-center'
            style={{ backgroundImage: `url(${imagePath(post.coverImage)})` }}
          />
        ) : null}

        <div
          className='prose prose-slate max-w-none mt-8 overflow-hidden break-words [&_*]:max-w-full [&_img]:h-auto [&_pre]:whitespace-pre-wrap [&_pre]:break-words'
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {post.products && post.products.length > 0 && (
          <section className='mt-10 border-t border-slate-200 pt-6'>
            <h2 className='text-xl font-bold text-slate-900'>
              Productos recomendados en esta publicacion
            </h2>
            <p className='text-sm text-slate-600 mt-1'>
              Estos productos fueron mencionados en el contenido.
            </p>
            <ul className='mt-4 grid gap-2'>
              {post.products.map((product) => {
                const productSlug = buildProductSlug({
                  id: product.id,
                  name: product.name,
                });

                return (
                  <li key={product.id}>
                    <Link
                      href={`/productos/${productSlug}`}
                      className='inline-flex items-center text-primary font-semibold hover:text-primaryHover transition-colors'
                    >
                      &gt; {product.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
