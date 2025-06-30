'use client';

import { createSuggestion } from '@/src/api/SuggestionApi';
import { inputStlyes } from '@/src/lib/global';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

export default function ContactPage() {
  async function sendContactAction(
    _: { success: boolean; message: string } | null,
    data: FormData
  ) {
    const title = data.get('title') as string;
    const description = data.get('description') as string;

    if (!title || !description) {
      return { success: false, message: 'Todos los campos son obligatorios.' };
    }
    try {
      await createSuggestion({ title, description });
      toast.success('Mensaje enviado correctamente.');
      return { success: true, message: 'Mensaje enviado correctamente.' };
    } catch {
      toast.error('Error al enviar el contacto.');
      return { success: false, message: 'Error al enviar el contacto.' };
    }
  }

  const [state, formAction] = useFormState(sendContactAction, null);

  return (
    <section className='container mx-auto py-16'>
      <h1 className='text-3xl font-bold text-center mb-8'>Contáctanos</h1>
      <p className='text-center mb-8'>
        Si tienes alguna pregunta o comentario, no dudes en contáctarnos.
        Estamos aquí para ayudarte.
      </p>
      <form
        action={formAction}
        className='max-w-3xl mx-auto flex flex-col gap-4'
      >
        <div className='mb-4'>
          <label htmlFor='razon'>Razon</label>
          <select name='title' id='razon' required className={inputStlyes}>
            <option value='Queja'>Queja</option>
            <option value='Sugerencia'>Sugerencia</option>
            <option value='Consulta'>Consulta</option>
            <option value='Problema'>Problema</option>
            <option value='Otro'>Otro</option>
          </select>
        </div>
        <div>
          <label htmlFor='comentario'>Comentario</label>
          <textarea
            name='description'
            className={`${inputStlyes} h-[300px]`}
            required
          />
        </div>
        <button className='bg-primary text-white py-3 max-w-lg w-full mx-auto px-4 rounded hover:bg-primary/80 transition-colors'>
          Enviar
        </button>
        {state?.message && (
          <div
            className={`text-center mb-4 font-bold ${
              state.success ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {state.message}
          </div>
        )}
      </form>
    </section>
  );
}
