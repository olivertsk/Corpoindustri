import Image from 'next/image';
import type { Metadata } from 'next';
import {
  BuildingOffice2Icon,
  CheckBadgeIcon,
  ClockIcon,
  CubeIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  TruckIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Propuesta Comercial | Corpoindustri',
  description:
    'Propuesta comercial de Alimentos Corpoindustri: suministro integral, logistica de despacho nacional y soluciones corporativas para empresas en Venezuela.',
  alternates: {
    canonical: '/about',
  },
};

type Item = {
  title: string;
  description: string;
};

const propuestaItems: Item[] = [
  {
    title: 'Transporte propio',
    description:
      'Flota exclusiva para controlar tiempos y calidad en cada entrega.',
  },
  {
    title: 'Cobertura nacional',
    description: 'Entregas en todo el pais, adaptadas a su operacion.',
  },
  {
    title: 'Rapidez y eficiencia',
    description: 'Atencion de pedidos grandes con entrega oportuna.',
  },
  {
    title: 'Facturacion clara',
    description: 'Sistema propio con conversion BCV para mayor precision.',
  },
];

const quienesSomos: Item[] = [
  {
    title: 'Transparencia',
    description: 'Operaciones claras y trazables en cada proceso.',
  },
  {
    title: 'Rapidez',
    description: 'Tiempo de respuesta agil para su equipo de compras.',
  },
  {
    title: 'Cumplimiento',
    description: 'Compromisos reales y entregas bajo estandares.',
  },
  {
    title: 'Atencion personalizada',
    description: 'Acompanamiento directo segun el perfil de su empresa.',
  },
];

const logisticaItems: Item[] = [
  {
    title: 'Transporte propio',
    description:
      'Unidades de carga dedicadas para mayor control, puntualidad y seguridad.',
  },
  {
    title: 'Cobertura nacional',
    description:
      'Despachos en todo el territorio nacional sin limitar su crecimiento.',
  },
  {
    title: 'Preparacion agil de pedidos',
    description: 'Capacidad operativa para volumen alto en tiempos reducidos.',
  },
  {
    title: 'Facturacion clara y precisa',
    description:
      'Conversion a tasa BCV para facilitar la gestion administrativa.',
  },
];

const solucionesItems: Item[] = [
  {
    title: 'Combos corporativos personalizados',
    description:
      'Alimentos adaptados a beneficios laborales, incentivos y programas sociales.',
  },
  {
    title: 'Suministro de insumos de limpieza',
    description:
      'Planes recurrentes para instalaciones administrativas, comerciales e industriales.',
  },
  {
    title: 'Facilidades de pago',
    description:
      'Metodos flexibles, financiamiento y conversion en tasa oficial.',
  },
];

const iconMap = [TruckIcon, GlobeAltIcon, ClockIcon, CheckBadgeIcon];

function FeatureCard({
  item,
  index,
  withCounter = false,
}: {
  item: Item;
  index: number;
  withCounter?: boolean;
}) {
  const Icon = iconMap[index % iconMap.length];
  return (
    <article className='rounded-2xl border border-blue-200/60 bg-white/85 p-5 shadow-md shadow-blue-900/5'>
      <div className='mb-3 flex items-center gap-3'>
        {withCounter ? (
          <span className='inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-black text-white'>
            {index + 1}
          </span>
        ) : (
          <Icon className='h-6 w-6 text-primary' />
        )}
        <h3 className='text-lg font-extrabold uppercase tracking-wide text-secondary'>
          {item.title}
        </h3>
      </div>
      <p className='text-slate-600'>{item.description}</p>
    </article>
  );
}

export default function AboutUsPage() {
  const beneficios = [
    'Soluciones adaptadas a su empresa',
    'Calidad y confianza en cada entrega',
    'Aliados para el crecimiento de su organizacion',
  ];

  return (
    <main className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
      <section className='relative overflow-hidden rounded-3xl border border-blue-800/25 bg-gradient-to-br from-secondary via-primary to-[#0b4ea1] p-7 text-white md:p-10'>
        <div className='absolute -right-16 -top-24 h-64 w-64 rounded-full bg-accent-100/20 blur-2xl' />
        <div className='absolute -left-20 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-2xl' />
        <div className='relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-2'>
          <div>
            <p className='mb-3 inline-block rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-100'>
              Tu mayorista de confianza
            </p>
            <h1 className='text-4xl font-black uppercase leading-tight sm:text-5xl'>
              Propuesta Comercial
            </h1>
            <p className='mt-5 max-w-2xl text-base text-blue-50 sm:text-lg'>
              Suministro integral y logistica de despacho nacional para empresas
              que buscan eficiencia, trazabilidad y cumplimiento constante.
            </p>
            <div className='mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3'>
              {beneficios.map((beneficio) => (
                <div
                  key={beneficio}
                  className='rounded-xl border border-white/20 bg-white/10 p-3 text-sm font-semibold text-blue-50'
                >
                  {beneficio}
                </div>
              ))}
            </div>
          </div>
          <div className='rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm'>
            <div className='rounded-xl bg-white p-4'>
              <Image
                width={520}
                height={220}
                style={{ objectFit: 'contain' }}
                src='/logo.png'
                alt='Corpoindustri Logo'
                className='mx-auto'
                priority
              />
            </div>
            <div className='mt-4 flex flex-wrap gap-3 text-sm'>
              <span className='rounded-full bg-accent-100 px-3 py-1 font-bold text-secondary'>
                Caracas, Venezuela
              </span>
              <span className='rounded-full border border-blue-100/40 px-3 py-1'>
                Atencion a gerencias de compras y RR.HH.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
        {propuestaItems.map((item, index) => (
          <FeatureCard key={item.title} item={item} index={index} />
        ))}
      </section>

      <section className='mt-10 grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:p-8 lg:grid-cols-2'>
        <div>
          <h2 className='text-3xl font-black uppercase text-secondary'>
            Quienes Somos
          </h2>
          <p className='mt-4 text-slate-700'>
            En Corpoindustri no solo comercializamos productos: nos convertimos
            en aliados estrategicos de su operacion. Somos una empresa mayorista
            especializada en alimentos, productos de higiene y limpieza, con
            servicios de entrega, cotizacion personalizada y atencion directa.
          </p>
          <p className='mt-4 text-slate-600'>
            Nos hemos consolidado como proveedor confiable gracias a una
            estructura enfocada en inventario, operaciones eficientes y un
            equipo comprometido con el servicio.
          </p>
        </div>
        <div className='grid grid-cols-1 gap-3'>
          {quienesSomos.map((item) => (
            <article
              key={item.title}
              className='rounded-xl border border-blue-200/60 bg-blue-50/40 p-4'
            >
              <div className='flex items-start gap-3'>
                <ShieldCheckIcon className='mt-0.5 h-5 w-5 shrink-0 text-primary' />
                <div>
                  <h3 className='font-bold text-secondary'>{item.title}</h3>
                  <p className='text-sm text-slate-600'>{item.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='mt-10 rounded-3xl border border-slate-200 bg-gradient-to-b from-white to-blue-50 p-6 md:p-8'>
        <h2 className='text-3xl font-black uppercase text-secondary'>
          Excelencia Operativa y Capacidad Logistica
        </h2>
        <p className='mt-3 max-w-4xl text-slate-700'>
          Entendemos que en el entorno empresarial el tiempo y la eficiencia son
          factores criticos. Por eso operamos con una estructura logistica
          robusta enfocada en puntualidad, seguridad y resultados medibles.
        </p>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
          {logisticaItems.map((item, index) => (
            <FeatureCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      <section className='mt-10 rounded-3xl border border-slate-200 bg-white p-6 md:p-8'>
        <div className='mb-6 flex items-center justify-between gap-4'>
          <h2 className='text-3xl font-black uppercase text-secondary'>
            Soluciones Adaptadas a su Empresa
          </h2>
          <span className='hidden rounded-full bg-accent-100 px-4 py-1 text-sm font-bold text-secondary md:inline-flex'>
            Alimentacion + Limpieza e Higiene
          </span>
        </div>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-3'>
          {solucionesItems.map((item, index) => (
            <FeatureCard
              key={item.title}
              item={item}
              index={index}
              withCounter
            />
          ))}
        </div>
      </section>

      <section className='mt-10 rounded-3xl border border-blue-900/30 bg-gradient-to-br from-secondary via-[#09336f] to-primary p-6 text-white md:p-8'>
        <h2 className='text-3xl font-black uppercase'>
          Transparencia y Conectividad
        </h2>
        <p className='mt-3 max-w-3xl text-blue-50'>
          Ponemos a su disposicion nuestros canales digitales para mostrar de
          forma directa nuestro trabajo y capacidad operativa.
        </p>
        <div className='mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4'>
          <div className='rounded-xl border border-white/20 bg-white/10 p-4'>
            <GlobeAltIcon className='h-6 w-6 text-accent-100' />
            <p className='mt-2 text-sm text-blue-100'>Web</p>
            <p className='font-bold'>www.corpoindustri.com</p>
          </div>
          <div className='rounded-xl border border-white/20 bg-white/10 p-4'>
            <UserGroupIcon className='h-6 w-6 text-accent-100' />
            <p className='mt-2 text-sm text-blue-100'>Redes sociales</p>
            <p className='font-bold'>@corpoindustri</p>
          </div>
          <div className='rounded-xl border border-white/20 bg-white/10 p-4'>
            <TruckIcon className='h-6 w-6 text-accent-100' />
            <p className='mt-2 text-sm text-blue-100'>Telefonos</p>
            <p className='font-bold'>+58 424-2418564 / +58 424-1518200</p>
          </div>
          <div className='rounded-xl border border-white/20 bg-white/10 p-4'>
            <BuildingOffice2Icon className='h-6 w-6 text-accent-100' />
            <p className='mt-2 text-sm text-blue-100'>Direccion</p>
            <p className='font-bold'>Av. Bolivar de Catia, Galpon 3, Caracas</p>
          </div>
        </div>
        <div className='mt-6 rounded-2xl border border-accent-100/50 bg-black/10 p-5'>
          <p className='text-lg font-semibold text-white'>
            En Corpoindustri estamos preparados para convertirnos en un aliado
            estrategico de su organizacion.
          </p>
          <p className='mt-2 text-blue-100'>
            Quedamos atentos para elaborar una cotizacion formal o coordinar una
            reunion personalizada con su equipo.
          </p>
        </div>
      </section>

      <section className='mt-6 grid grid-cols-2 gap-3 pb-4 sm:grid-cols-3 lg:grid-cols-6'>
        {[
          { title: 'Confiabilidad', icon: CheckBadgeIcon },
          { title: 'Seguridad', icon: ShieldCheckIcon },
          { title: 'Eficiencia', icon: ClockIcon },
          { title: 'Compromiso', icon: UserGroupIcon },
          { title: 'Inventario', icon: CubeIcon },
          { title: 'Cobertura', icon: GlobeAltIcon },
        ].map(({ title, icon: Icon }) => (
          <div
            key={title}
            className='rounded-xl border border-slate-200 bg-white p-3 text-center shadow-sm'
          >
            <Icon className='mx-auto h-5 w-5 text-primary' />
            <p className='mt-2 text-xs font-semibold uppercase text-slate-600'>
              {title}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
