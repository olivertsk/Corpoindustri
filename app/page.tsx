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
      target: 'https://corpoindustri.com/buscar?name={search_term_string}',
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

  const quickAccessLinks = [
    {
      label: 'Viveres al mayor',
      description: 'Productos de alta rotacion para reposicion diaria',
      href: '/search?name=viveres',
    },
    {
      label: 'Limpieza y hogar',
      description: 'Insumos clave para comercios y hogares',
      href: '/search?name=limpieza',
    },
    {
      label: 'Bebidas y refrigerados',
      description: 'Surtido para aumentar ticket promedio',
      href: '/search?name=bebidas',
    },
    {
      label: 'Combos mayoristas',
      description: 'Alternativas por volumen para mejorar margen',
      href: '/search?name=combos',
    },
  ];

  const processSteps = [
    {
      title: 'Busca y cotiza',
      text: 'Explora categorias, agrega productos y solicita cotizacion por volumen.',
    },
    {
      title: 'Confirma con ventas',
      text: 'Nuestro equipo valida disponibilidad, precios y condiciones para tu negocio.',
    },
    {
      title: 'Recibe y repone',
      text: 'Coordinamos despacho por zona para mantener tu inventario en movimiento.',
    },
  ];

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
        <div className='container mx-auto px-4 pt-4'>
          <div className='bg-secondary text-white rounded-2xl px-4 py-3 grid gap-2 text-xs sm:text-sm lg:grid-cols-4 lg:gap-4 shadow-[0_14px_28px_rgba(8,26,50,0.22)]'>
            <p className='font-semibold'>
              Entrega en zonas activas y rutas comerciales
            </p>
            <p className='font-semibold'>
              Cotizaciones rapidas para compra mayorista
            </p>
            <p className='font-semibold'>
              Atencion personalizada para negocios
            </p>
            <p className='font-semibold'>
              Promociones por volumen para mejorar margen
            </p>
          </div>
        </div>

        <div className='container mx-auto px-4 py-6 md:py-8'>
          <div className='grid gap-4 lg:grid-cols-[1.45fr_1fr]'>
            <div className='section-shell border border-white/80 rounded-3xl p-6 lg:p-8'>
              <p className='text-xs md:text-sm uppercase tracking-[0.2em] text-primary font-bold'>
                Mayorista B2B en Venezuela
              </p>
              <h1 className='mt-3 text-3xl sm:text-5xl font-black text-slate-900 leading-[0.95] max-w-3xl'>
                Alimentos, viveres y productos de alta rotacion para tu negocio
              </h1>
              <p className='mt-4 text-slate-600 max-w-2xl'>
                Abastece mas rapido con un catalogo pensado para abastos,
                bodegas y distribuidores: cotizacion agil, precios competitivos
                y acompanamiento comercial.
              </p>
              <div className='mt-5 flex flex-wrap gap-3'>
                <Link
                  href='/search?name=viveres'
                  className='bg-primary text-white font-bold px-5 py-2.5 rounded-xl hover:bg-primaryHover transition-colors'
                >
                  Ver catalogo de alimentos
                </Link>
                <Link
                  href='/contact'
                  className='bg-accent-100 text-black font-bold px-5 py-2.5 rounded-xl hover:bg-accent-200 transition-colors'
                >
                  Solicitar cotizacion
                </Link>
              </div>
              <div className='mt-6 grid sm:grid-cols-3 gap-3'>
                <div className='bg-white rounded-xl border border-slate-100 p-3'>
                  <p className='text-xl font-black text-slate-900'>+10k</p>
                  <p className='text-xs text-slate-500'>
                    Productos para reposicion continua
                  </p>
                </div>
                <div className='bg-white rounded-xl border border-slate-100 p-3'>
                  <p className='text-xl font-black text-slate-900'>24h</p>
                  <p className='text-xs text-slate-500'>
                    Respuesta comercial en dias habiles
                  </p>
                </div>
                <div className='bg-white rounded-xl border border-slate-100 p-3'>
                  <p className='text-xl font-black text-slate-900'>B2B</p>
                  <p className='text-xs text-slate-500'>
                    Atencion especializada por volumen
                  </p>
                </div>
              </div>
            </div>

            <div className='bg-primary text-white rounded-3xl p-6 lg:p-7 shadow-[0_18px_34px_rgba(1,40,93,0.28)]'>
              <p className='text-xs uppercase tracking-[0.2em] text-accent-100 font-bold'>
                Compra Inteligente
              </p>
              <h2 className='mt-2 text-2xl font-black leading-tight'>
                Atajos para comprar mas rapido
              </h2>
              <div className='mt-4 space-y-3'>
                {quickAccessLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='block bg-white/10 rounded-xl border border-white/20 p-3 hover:bg-white/20 transition-colors'
                  >
                    <p className='font-bold text-white'>{item.label}</p>
                    <p className='text-xs text-white/80 mt-0.5'>
                      {item.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {principalBannerData.length && (
          <BannerSlider slides={principalBannerData} showFadeOut={true} />
        )}

        <div className='container mx-auto px-4 pt-4 pb-6'>
          <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
            <Link
              href='/search?name=viveres'
              className='bg-white border border-slate-200 rounded-xl p-4 hover:border-primary/40 transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Top busquedas
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Viveres
              </h2>
            </Link>
            <Link
              href='/search?name=harina'
              className='bg-white border border-slate-200 rounded-xl p-4 hover:border-primary/40 transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Top busquedas
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Harina
              </h2>
            </Link>
            <Link
              href='/search?name=arroz'
              className='bg-white border border-slate-200 rounded-xl p-4 hover:border-primary/40 transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Top busquedas
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Arroz
              </h2>
            </Link>
            <Link
              href='/search?name=limpieza'
              className='bg-white border border-slate-200 rounded-xl p-4 hover:border-primary/40 transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-slate-400'>
                Top busquedas
              </p>
              <h2 className='mt-1 text-lg font-extrabold text-slate-800'>
                Limpieza
              </h2>
            </Link>
            <Link
              href='/contact'
              className='rounded-xl bg-primary text-white p-4 border border-primaryHover hover:bg-primaryHover transition-colors'
            >
              <p className='text-xs font-bold uppercase tracking-wide text-white/70'>
                Equipo comercial
              </p>
              <h2 className='mt-1 text-lg font-extrabold'>
                Solicita cotizacion
              </h2>
            </Link>
          </div>
        </div>

        <div className='container mx-auto mb-4 px-4'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-2xl font-black text-slate-800'>
              Categorias destacadas
            </h3>
            <Link
              href='/search'
              className='text-sm font-bold text-primary hover:text-primaryHover transition-colors'
            >
              Ver todo el catalogo
            </Link>
          </div>
          {categoryData && <CategoriesWrapper categoryData={categoryData} />}
        </div>

        <div className='container mx-auto mb-4'>
          {firstHalf.map((department: Department) => (
            <ProductsSlider
              key={department.id}
              titleSection={department.name}
              products={department.products || []}
              departmentId={department.id}
            />
          ))}
        </div>
        <div className='container mx-auto mb-4 px-4'>
          <div className='space-y-4 lg:space-y-0 lg:grid gap-4 lg:grid-cols-3 lg:items-stretch'>
            <div className='lg:col-span-2'>
              {secondaryBannerData.length && (
                <BannerSlider
                  floatingBanner={true}
                  slides={secondaryBannerData}
                />
              )}
            </div>
            <div className='space-y-4 lg:space-y-0 lg:grid w-full sm:grid-cols-2 lg:grid-cols-1 gap-4'>
              <Link
                href='/contact'
                className='flex flex-col p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-shadow'
              >
                <p className='text-xs uppercase tracking-wide font-bold text-slate-400'>
                  B2B
                </p>
                <h3 className='text-xl font-black text-slate-800 mt-1'>
                  Ventas asistidas para tu negocio
                </h3>
                <p className='text-sm text-slate-600 mt-2'>
                  Arma pedidos recurrentes con ayuda de nuestro equipo.
                </p>
              </Link>
              <Link
                href='/search?name=promocion'
                className='flex flex-col rounded-2xl bg-secondary text-white p-5 border border-secondary/80 hover:bg-primary transition-colors'
              >
                <p className='text-xs uppercase tracking-wide font-bold text-accent-100'>
                  Ofertas
                </p>
                <h3 className='text-xl font-black mt-1'>
                  Promociones por volumen
                </h3>
                <p className='text-sm text-white/90 mt-2'>
                  Descubre productos de alta rotacion con mejores margenes.
                </p>
              </Link>
            </div>
          </div>

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

          <section className='rounded-2xl bg-white border border-slate-200 p-6 md:p-8 mb-10'>
            <h3 className='text-2xl font-black text-slate-800'>
              Como comprar en Corpoindustri
            </h3>
            <div className='grid md:grid-cols-3 gap-4 mt-4'>
              {processSteps.map((step, index) => (
                <article
                  key={step.title}
                  className='rounded-xl border border-slate-200 p-4 bg-slate-50/60'
                >
                  <p className='text-xs font-bold uppercase tracking-[0.14em] text-primary'>
                    Paso {index + 1}
                  </p>
                  <h4 className='font-extrabold text-slate-800 mt-1'>
                    {step.title}
                  </h4>
                  <p className='text-sm text-slate-600 mt-2'>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <div className='space-y-8 '>
            <TiktokSection />
            <InstagramSection />
          </div>
          <MapSection data={mapData.data} />

          <div className='section-shell rounded-2xl border border-white/80 p-6 md:p-8 mt-12 mb-12'>
            <h3 className='text-3xl font-black text-slate-800'>
              Por que negocios compran con Corpoindustri
            </h3>
            <div className='grid gap-6 mt-5 md:grid-cols-2 lg:grid-cols-4'>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Surtido amplio
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Categorías de alta rotación para que mantengas inventario
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
                  Planificación de despacho según ruta, zona y frecuencia de
                  compra.
                </p>
              </article>
              <article>
                <h4 className='font-extrabold text-slate-800'>
                  Atención directa
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Soporte por canales digitales para resolver pedidos y dudas
                  rápido.
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
              <article className='bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors'>
                <h4 className='font-bold text-slate-800'>
                  ¿Quién puede comprar en Corpoindustri?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Comercios, bodegas, abastos y clientes que necesiten compra
                  por volumen con atención comercial.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors'>
                <h4 className='font-bold text-slate-800'>
                  ¿Ofrecen delivery y cobertura por zonas?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Si. Revisa zonas disponibles y tiempos en contacto con nuestro
                  equipo de ventas.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors'>
                <h4 className='font-bold text-slate-800'>
                  ¿Se pueden solicitar cotizaciones personalizadas?
                </h4>
                <p className='text-sm text-slate-600 mt-1'>
                  Si. Armamos cotizaciones según tipo de negocio, categoría y
                  frecuencia de reposición.
                </p>
              </article>
              <article className='bg-white border border-slate-200 rounded-xl p-5 hover:border-primary/40 transition-colors'>
                <h4 className='font-bold text-slate-800'>
                  ¿Manejan combos mayoristas?
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
