"use client"
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Cargar el componente Accordion dinámicamente para que se renderice del lado del cliente
const AccordionTerm = dynamic(() => import('@/src/components/terms/AccordionTerm'), { ssr: false });

const TermsPage: React.FC = () => {
  const accordionItems = [
    { title: 'Política de Privacidad', content: 'Nos comprometemos a proteger su privacidad y a utilizar su información personal solo para procesar su pedido y mejorar su experiencia de compra.' },
    { title: 'Condiciones de Uso', content: 'Al utilizar nuestro sitio web, usted acepta cumplir con nuestros términos y condiciones y con todas las leyes y regulaciones aplicables.' },
    { title: 'Política de Devoluciones', content: 'Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que los productos estén en su estado original y sin abrir.' },
    { title: 'Métodos de Pago', content: 'Aceptamos pagos con tarjetas de débito, pago móvil, divisas, zelle, binance. Todos los pagos son seguros y están encriptados.' },
    { title: 'Envíos y Entregas', content: 'Ofrecemos envíos a nivel nacional. Los tiempos de entrega varían según la ubicación y el método de envío seleccionado.' },
    { title: 'Precios y Disponibilidad', content: 'Todos los precios están sujetos a cambios sin previo aviso. La disponibilidad de los productos puede variar y no garantizamos la disponibilidad de ningún artículo en particular.' },
    { title: 'Promociones y Descuentos', content: 'Las promociones y descuentos son válidos por tiempo limitado y no pueden combinarse con otras ofertas.' },
    { title: 'Responsabilidad', content: 'No nos hacemos responsables por daños indirectos, incidentales o consecuentes que resulten del uso de nuestros productos.' },
    { title: 'Propiedad Intelectual', content: 'Todo el contenido de nuestro sitio web, incluyendo textos, imágenes y logotipos, es propiedad de nuestra empresa y está protegido por las leyes de propiedad intelectual.' },
    { title: 'Modificaciones de los Términos', content: 'Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas inmediatamente después de su publicación en nuestro sitio web.' },
  ];

  return (
    <main className='container mx-auto grid grid-cols-1 lg:gap-1 min-h-screen'>
      <Head>
        <title>Términos y Condiciones</title>
        <meta name="description" content="Términos y condiciones de nuestra tienda virtual de víveres." />
      </Head>
      <div className="container px-4 w-full">
        <h1 className="text-3xl font-bold my-8">Términos y Condiciones</h1>
        <div style={{ display: 'none' }}>
          {accordionItems.map((item, index) => (
            <div key={index} className="border-b border-gray-200 py-4">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
        <AccordionTerm items={accordionItems} />
      </div>
    </main>
  );
};

export default TermsPage;
