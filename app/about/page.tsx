import Image from 'next/image';
import Section from './Section';

export default function aboutUs() {
  const items = [
    'Compromiso: Asumimos con responsabilidad nuestras obligaciones con clientes, proveedores, colaboradores y la comunidad.',
    'Excelencia: Buscamos superar las expectativas de nuestros clientes en cada interacción, ofreciendo productos y servicios de la más alta calidad.',
    'Integridad: Actuamos con honestidad, transparencia y ética en todas nuestras relaciones.'
  ]
  return (
    <>
      <div className='bg-login-bg bg-cover bg-center bg-no-repeat h-96 from-primary to-secondary rounded-xl flex md:flex-row w-full items-center flex-col'>
        <div className='w-[40%] md:p-11 p-1 mt-4 md:mt-0'>
          <Image
            width={500}
            height={250}
            style={{
              objectFit: 'contain',
            }}
            src='/logo.png'
            alt='Corpoindustri Logo'
          />
        </div>
        <div className="w-full p-4 flex flex-col items-center">
          <h1 className="text-2xl text-center font-black text-white mb-4">
            Conocenos
          </h1>
          <p className='text-white md:w-[60%] w-full text-justify'>
            Desde 1969 nuestro equipo de trabajo se esmera en conquistar cada día el corazón de las familias venezolanas con experiencias de compra únicas y diferenciadoras. Con sucursales en la Gran Caracas y un canal de compra en línea, más de 3.000 mil trabajadores se dan cita todos los días para servir con excelencia a la familia venezolana.
          </p>
        </div>
      </div>
      <main className='container mx-auto grid grid-cols-1 lg:gap-1 mb-9'>
        <div className="mt-8 mx-auto flex flex-row flex-wrap justify-around w-full h-auto align-top">
          <Section
            title="Nuestra Misión"
            content="Ser el aliado estratégico de nuestros clientes corporativos y empresariales en el sector alimenticio. Brindándoles soluciones integrales a través de la distribución eficiente de productos de alta calidad, un servicio excepcional y un compromiso con la sostenibilidad."
            imageSrc='/about/mision.jpeg'
            imageAlt='Mision Corpoindustri'
            animateFrom='left'
          />
          <Section
            title="Nuestra Visión"
            content="Consolidarnos como la empresa mayorista de alimentos líder en Venezuela, reconocida por nuestra excelencia en la distribución, la innovación en la oferta de productos y el desarrollo de relaciones duraderas con nuestros clientes."
            imageSrc='/about/vision.jpeg' // Ajusta la ruta de la imagen según corresponda
            imageAlt='Vision Corpoindustri'
            animateFrom='right'
          />
          <Section
            title="Valores"
            content={items}
            imageSrc='/about/valores.jpeg' // Ajusta la ruta de la imagen según corresponda
            imageAlt='Valores Corpoindustri'
            animateFrom='left'
          />
        </div>
      </main>
    </>
  );
}
