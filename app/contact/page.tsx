import { getMaps } from '@/src/api/MapApi ';
import ContactMap from '@/src/components/contact/ContactMap';
import MainForm from '@/src/components/contact/MainForm';
import { TMap } from '@/src/types/map';

export default async function ContactPage() {
  const mapData: { data: TMap[] } = await getMaps({
    isClient: true,
  });

  return (
    <main className='pb-16'>
      <MainForm />

      <section className='container mx-auto mt-6 grid gap-5 px-4 sm:grid-cols-2 lg:grid-cols-3'>
        <article className='section-shell rounded-2xl p-5'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-primary/80'>
            Atención
          </p>
          <h2 className='mt-2 text-lg font-bold text-slate-800'>
            Horario comercial
          </h2>
          <p className='mt-2 text-sm text-slate-600'>
            Lunes a viernes de 8:00 a. m. a 5:00 p. m. y sábados de 8:00 a. m. a
            12:00 m.
          </p>
        </article>

        <article className='section-shell rounded-2xl p-5'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-primary/80'>
            Cobertura
          </p>
          <h2 className='mt-2 text-lg font-bold text-slate-800'>
            Entregas en Venezuela
          </h2>
          <p className='mt-2 text-sm text-slate-600'>
            Coordinamos envíos para abastos, bodegas, minimercados y
            distribuidores en distintas ciudades del país.
          </p>
        </article>

        <article className='section-shell rounded-2xl p-5 sm:col-span-2 lg:col-span-1'>
          <p className='text-xs font-semibold uppercase tracking-[0.16em] text-primary/80'>
            Prioridad
          </p>
          <h2 className='mt-2 text-lg font-bold text-slate-800'>
            Soporte por volumen
          </h2>
          <p className='mt-2 text-sm text-slate-600'>
            Si compras al mayor, te asignamos atención especializada para
            acelerar cotizaciones recurrentes.
          </p>
        </article>
      </section>

      <section className='container mx-auto mt-8 px-4'>
        <div className='relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_18px_42px_rgba(15,39,70,0.12)]'>
          <ContactMap mapData={mapData} />
          <article className='m-4 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur sm:absolute sm:right-4 sm:top-4 sm:m-0 sm:max-w-sm z-10'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-primary/80'>
              Visítanos
            </p>
            <h2 className='mt-1 text-2xl font-black text-slate-800 display-title'>
              Centro de atención
            </h2>
            <p className='mt-3 text-sm text-slate-600'>
              Recibimos citas para asesoría de compras de alimentos y productos
              de consumo masivo al mayor.
            </p>
            <p className='mt-3 text-sm font-semibold text-slate-700'>
              Caracas, Venezuela
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
