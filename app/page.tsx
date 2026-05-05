import { fxAllBanner } from '@/src/api/BannerApi';
import { fxAllCategories } from '@/src/api/CategoriesApi';
import { getDepartments } from '@/src/api/DepartmentsApi';
import { getMaps } from '@/src/api/MapApi ';
import type { Metadata } from 'next';
import Link from 'next/link';
import CategoriesWrapper from '@/src/components/categories/CategoriesWrapper';
import BannerSlider from '@/src/components/home/BannerSlider';
import InstagramSection from '@/src/components/home/InstagramSection';
import { MapSection } from '@/src/components/home/MapSection';
import PopoverBanner from '@/src/components/home/PopoverBanner';
import ProductsSlider from '@/src/components/home/ProductsSlider';
import TiktokSection from '@/src/components/home/TiktokSection';
import ShowClientSurvey from '@/src/components/survey/ShowClientSurvey';
import { EPositionBanner, IBanner } from '@/src/types/banner';
import { ICategory, ICategoryFilter } from '@/src/types/category';
import { Department, DepartmentFilters } from '@/src/types/department';
import { TMap } from '@/src/types/map';

export const metadata: Metadata = {
  title: 'Mayorista de alimentos para negocios en Venezuela',
  description:
    'Compra viveres, limpieza y productos de alta rotacion para abastos y bodegas. Delivery, cotizaciones y atencion personalizada para negocios en Venezuela.',
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  /** Categorias destacadas para carrousel */
  const categoryFilter: ICategoryFilter = {
    isSalient: true,
  };
  const categoryData: ICategory[] = await fxAllCategories(categoryFilter);

  const result = await Promise.allSettled([
    fxAllBanner({
      position: EPositionBanner.HomePrincipal,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.HomeSecondary,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.HomeTertiary,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.Contact,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.PopupOnce,
      isClient: true,
    }),
    fxAllBanner({
      position: EPositionBanner.AlwaysPopup,
      isClient: true,
    }),
  ]);

  const principalBannerData: IBanner[] =
    result[0].status === 'fulfilled' ? result[0].value : [];
  const secondaryBannerData: IBanner[] =
    result[1].status === 'fulfilled' ? result[1].value : [];
  const tertiaryBannerData: IBanner[] =
    result[2].status === 'fulfilled' ? result[2].value : [];

  const contactBannerData: IBanner[] =
    result[3].status === 'fulfilled' ? result[3].value : [];
  const popupOnce: IBanner[] =
    result[4].status === 'fulfilled' ? result[4].value : [];
  const alwaysPopup: IBanner[] =
    result[5].status === 'fulfilled' ? result[5].value : [];

  /** Departamentos destacadas para secciones de productos */
  const departamentFilter: DepartmentFilters = {
    isSalient: true,
    product: true,
    isClient: true,
  };

  const mapData: { data: TMap[] } = await getMaps({
    isClient: true,
  });

  const departamentData: { data: Department[] } =
    await getDepartments(departamentFilter);

  const half = Math.ceil(departamentData.data.length / 2);
  const firstHalf = departamentData.data.slice(0, half);
  const secondHalf = departamentData.data.slice(half);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Corpoindustri',
    url: 'https://corpoindustri.com',
    inLanguage: 'es-VE',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://corpoindustri.com/search?search={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const retailSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: 'Corpoindustri',
    url: 'https://corpoindustri.com',
    areaServed: 'VE',
    availableLanguage: ['Spanish'],
    priceRange: '$$',
    slogan: 'Mayorista de alimentos y productos para tu negocio',
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(retailSchema),
        }}
      />
      <PopoverBanner
        banner={popupOnce.length ? popupOnce : alwaysPopup}
        isOncePopup={!!popupOnce.length}
      />
      <section>
        <ShowClientSurvey />
        <div className='bg-secondary text-white'>
          <div className='container mx-auto px-4 py-3 grid gap-2 text-xs sm:text-sm lg:grid-cols-4 lg:gap-4'>
            <p className='font-semibold'>
              Delivery para negocios en zonas activas
            </p>
            <p className='font-semibold'>
              Cotizaciones rapidas para compras grandes
            </p>
            <p className='font-semibold'>
              Combos mayoristas para alta rotacion
            </p>
            <p className='font-semibold'>
              Atencion personalizada para tu comercio
            </p>
          </div>
        </div>

        <div className='container mx-auto px-4 py-8'>
          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-black text-slate-800 tracking-tight max-w-4xl'>
            Mayorista de alimentos y productos para abastos, bodegas y comercios
            en Venezuela
          </h1>
          <p className='mt-3 text-slate-600 max-w-3xl'>
            Compra por categoria, recibe atencion comercial y encuentra
            promociones por volumen para acelerar la reposicion de tu negocio.
          </p>
        </div>

        {principalBannerData.length && (
          <BannerSlider slides={principalBannerData} showFadeOut={true} />
        )}

        <div className='container mx-auto px-4 pt-4 pb-8'>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
            <Link
              href='/search?name=viveres'
              className='rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Alta demanda
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Viveres
              </h2>
              <p className='mt-1 text-sm text-slate-600'>
                Arroz, pasta, harina, granos y despensa para reposicion rapida.
              </p>
            </Link>
            <Link
              href='/search?name=limpieza'
              className='rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Operacion diaria
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Limpieza
              </h2>
              <p className='mt-1 text-sm text-slate-600'>
                Insumos para hogares, negocios y canales institucionales.
              </p>
            </Link>
            <Link
              href='/search?name=combos'
              className='rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:shadow-md transition-shadow'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Margen por volumen
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Combos
              </h2>
              <p className='mt-1 text-sm text-slate-600'>
                Packs listos para abastecer puntos de venta con mejor costo.
              </p>
            </Link>
            <Link
              href='/contact'
              className='rounded-2xl bg-primary text-white p-4 shadow-sm hover:bg-primaryHover transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-white/70'>
                Equipo comercial
              </p>
              <h2 className='mt-1 text-lg font-extrabold'>
                Solicita cotizacion
              </h2>
              <p className='mt-1 text-sm text-white/90'>
                Te asesoramos segun rotacion, presupuesto y tipo de negocio.
              </p>
            </Link>
          </div>
        </div>

        <div className='container mx-auto mb-4'>
          {categoryData && <CategoriesWrapper categoryData={categoryData} />}
          {firstHalf.map((department: Department) => (
            <ProductsSlider
              key={department.id}
              titleSection={department.name}
              products={department.products || []}
              departmentId={department.id}
            />
          ))}
        </div>
        <div className='container mx-auto mb-4'>
          {secondaryBannerData.length && (
            <BannerSlider floatingBanner={true} slides={secondaryBannerData} />
          )}
          <div className='mt-12'>
            {secondHalf.map((department: Department) => (
              <ProductsSlider
                products={department.products || []}
                key={department.id}
                titleSection={department.name}
                departmentId={department.id}
              />
            ))}
          </div>
        </div>
        <div className='container mx-auto mt-4 mb-4 p-4'>
          {tertiaryBannerData.length && (
            <div className='mb-24'>
              <BannerSlider floatingBanner={true} slides={tertiaryBannerData} />
            </div>
          )}
          <div className='space-y-8 '>
            <TiktokSection />
            <InstagramSection />
          </div>
          <MapSection data={mapData.data} />

          <div className='rounded-2xl border border-slate-200 bg-white p-6 md:p-8 mt-12 mb-12'>
            <h3 className='text-2xl font-black text-slate-800'>
              Por que negocios compran con Corpoindustri
            </h3>
            <div className='grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-4'>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Surtido amplio
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Categorias de alta rotacion para que mantengas inventario
                  activo.
                </p>
              </article>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Precios competitivos
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Descuentos por volumen y oportunidades para mejorar tu margen.
                </p>
              </article>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Entrega coordinada
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Planificacion de despacho segun ruta, zona y frecuencia de
                  compra.
                </p>
              </article>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Atencion directa
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Soporte por canales digitales para resolver pedidos y dudas
                  rapido.
                </p>
              </article>
            </div>
          </div>

          {contactBannerData.length > 0 && (
            <div className='mb-24'>
              <BannerSlider
                floatingBanner={true}
                slides={contactBannerData}
                redirectTo='contact'
              />
            </div>
          )}

          <section className='pb-16'>
            <h3 className='text-2xl font-black text-slate-800'>
              Preguntas frecuentes
            </h3>
            <div className='grid gap-4 mt-4 md:grid-cols-2'>
              <article className='bg-white border border-slate-200 rounded-xl p-4'>
                <h4 className='font-bold text-slate-800'>
                  Quien puede comprar en Corpoindustri?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Comercios, bodegas, abastos y clientes que necesiten compra
                  por volumen con atencion comercial.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-4'>
                <h4 className='font-bold text-slate-800'>
                  Ofrecen delivery y cobertura por zonas?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Si. Revisa zonas disponibles y tiempos en contacto con nuestro
                  equipo de ventas.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-4'>
                <h4 className='font-bold text-slate-800'>
                  Se pueden solicitar cotizaciones personalizadas?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Si. Armamos cotizaciones segun tipo de negocio, categoria y
                  frecuencia de reposicion.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-4'>
                <h4 className='font-bold text-slate-800'>
                  Manejan combos mayoristas?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Tenemos promociones y combos pensados para mejorar ticket y
                  rentabilidad de reventa.
                </p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
