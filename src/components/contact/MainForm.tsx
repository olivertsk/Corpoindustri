'use client';

import { createSuggestion } from '@/src/api/SuggestionApi';
import { inputStlyes } from '@/src/lib/global';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

export default function MainForm() {
  async function sendContactAction(
    _: { success: boolean; message: string } | null,
    data: FormData,
  ) {
    const firstName = (data.get('firstName') as string)?.trim();
    const lastName = (data.get('lastName') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const phone = (data.get('phone') as string)?.trim();
    const service = data.get('service') as string;
    const source = data.get('source') as string;
    const comment = (data.get('comment') as string)?.trim();

    const title = `Contacto - ${service}`;
    const description = [
      `<b>Nombre</b>: ${firstName} ${lastName}`,
      `<b>Correo</b>: ${email}`,
      `<b>Teléfono</b>: ${phone}`,
      `<b>Servicio de interés</b>: ${service}`,
      `<b>¿Cómo nos conoció?</b>: ${source}`,
      `<b>Mensaje</b>: ${comment}`,
    ].join('\n\n');

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !service ||
      !source ||
      !comment
    ) {
      return { success: false, message: 'Todos los campos son obligatorios.' };
    }
    try {
      await createSuggestion({ title, description });
      toast.success('Tu solicitud fue enviada correctamente.');
      return {
        success: true,
        message:
          'Tu solicitud fue enviada correctamente. Te responderemos en breve.',
      };
    } catch {
      toast.error('Ocurrió un error al enviar la solicitud.');
      return {
        success: false,
        message:
          'No pudimos enviar tu solicitud en este momento. Inténtalo nuevamente.',
      };
    }
  }
  const [state, formAction] = useFormState(sendContactAction, null);
  return (
    <section className='relative overflow-hidden bg-gradient-to-r from-primary to-[#1d8ff6]'>
      <div className='absolute -left-20 top-6 h-44 w-44 rounded-full bg-white/10 blur-xl' />
      <div className='absolute right-8 bottom-2 h-56 w-56 rounded-full bg-cyan-300/20 blur-2xl' />

      <div className='container mx-auto grid gap-8 px-4 py-12 lg:grid-cols-12 lg:py-16'>
        <div className='lg:col-span-5 text-white fade-up'>
          <p className='text-sm font-semibold uppercase tracking-[0.18em] text-white/80'>
            Soporte comercial
          </p>
          <h1 className='mt-3 text-4xl font-black leading-tight display-title lg:text-5xl'>
            Contáctanos
          </h1>
          <p className='mt-4 max-w-md text-sm leading-relaxed text-blue-50 lg:text-base'>
            ¿Buscas alimentos y productos de alta rotación al mayor? Nuestro
            equipo te ayuda con cotizaciones, disponibilidad y tiempos de
            entrega en toda Venezuela.
          </p>

          <ul className='mt-8 space-y-3 text-sm lg:text-base'>
            <li className='flex items-start gap-3'>
              <span className='mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold'>
                1
              </span>
              <span>Revisamos tu solicitud y validamos el inventario.</span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold'>
                2
              </span>
              <span>Te enviamos una propuesta clara y personalizada.</span>
            </li>
            <li className='flex items-start gap-3'>
              <span className='mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/25 text-xs font-bold'>
                3
              </span>
              <span>Coordinamos despacho y seguimiento de tu pedido.</span>
            </li>
          </ul>

          <p className='mt-7 text-sm text-blue-100'>
            Tiempo estimado de respuesta: entre 30 minutos y 2 horas hábiles.
          </p>
        </div>

        <div className='lg:col-span-7 lg:pl-8'>
          <form
            action={formAction}
            className='surface-panel fade-up rounded-2xl bg-white p-5 shadow-2xl lg:p-7'
          >
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <label
                  htmlFor='firstName'
                  className='mb-1 block text-sm font-medium'
                >
                  Nombre
                </label>
                <input
                  id='firstName'
                  name='firstName'
                  type='text'
                  required
                  className={inputStlyes}
                  placeholder='Ej.: Carlos'
                />
              </div>
              <div>
                <label
                  htmlFor='lastName'
                  className='mb-1 block text-sm font-medium'
                >
                  Apellido
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  type='text'
                  required
                  className={inputStlyes}
                  placeholder='Ej.: Pérez'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='mb-1 block text-sm font-medium'
                >
                  Correo electrónico
                </label>
                <input
                  id='email'
                  name='email'
                  type='email'
                  required
                  className={inputStlyes}
                  placeholder='nombre@empresa.com'
                />
              </div>
              <div>
                <label
                  htmlFor='phone'
                  className='mb-1 block text-sm font-medium'
                >
                  Teléfono
                </label>
                <input
                  id='phone'
                  name='phone'
                  type='tel'
                  required
                  className={inputStlyes}
                  placeholder='Ej.: 0412-000-0000'
                />
              </div>
              <div>
                <label
                  htmlFor='service'
                  className='mb-1 block text-sm font-medium'
                >
                  Servicio
                </label>
                <select
                  id='service'
                  name='service'
                  required
                  className={inputStlyes}
                  defaultValue=''
                >
                  <option value='' disabled>
                    Selecciona una opción
                  </option>
                  <option value='Cotización mayorista'>
                    Cotización mayorista
                  </option>
                  <option value='Asesoría de productos'>
                    Asesoría de productos
                  </option>
                  <option value='Seguimiento de pedido'>
                    Seguimiento de pedido
                  </option>
                  <option value='Atención posventa'>Atención posventa</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor='source'
                  className='mb-1 block text-sm font-medium'
                >
                  ¿Cómo nos conociste?
                </label>
                <select
                  id='source'
                  name='source'
                  required
                  className={inputStlyes}
                  defaultValue=''
                >
                  <option value='' disabled>
                    Selecciona una opción
                  </option>
                  <option value='Google'>Google</option>
                  <option value='Instagram'>Instagram</option>
                  <option value='Facebook'>Facebook</option>
                  <option value='Recomendación'>Recomendación</option>
                  <option value='Otro'>Otro</option>
                </select>
              </div>
            </div>

            <div className='mt-4'>
              <label
                htmlFor='comment'
                className='mb-1 block text-sm font-medium'
              >
                Cuéntanos lo que necesitas
              </label>
              <textarea
                id='comment'
                name='comment'
                className={`${inputStlyes} min-h-[140px]`}
                required
                placeholder='Indícanos los productos que necesitas, la cantidad estimada y tu zona de entrega.'
              />
            </div>

            <p className='mt-4 text-xs text-slate-500'>
              Al enviar este formulario, aceptas que usemos tus datos para
              contactarte con información comercial relacionada a tu solicitud.
            </p>

            <div className='mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
              <button className='rounded-full bg-primary px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-primary/85'>
                Enviar solicitud
              </button>
              {state?.message && (
                <div
                  className={`text-sm font-semibold ${
                    state.success ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {state.message}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
