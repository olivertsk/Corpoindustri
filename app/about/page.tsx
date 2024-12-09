import Image from 'next/image';

export default function aboutUs() {
  return (
    <>
      <main className='container mx-auto grid grid-cols-1 lg:gap-1 min-h-screen'>
        <div className='bg-login-bg bg-cover bg-center bg-no-repeat h-96 from-primary to-secondary rounded-xl flex md:flex-row w-full items-center mt-8 flex-col'>
          <div className='w-[40%] md:p-11 p-1'>
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
          <div className="md:w-[60%] w-full p-4 flex flex-col items-center">
            <h1 className="text-2xl text-center font-black text-white mb-4">
              Conocenos
            </h1>
            <p className='text-white md:w-[60%] w-full text-justify'>
              Desde 1969 nuestro equipo de trabajo se esmera en conquistar cada día el corazón de las familias venezolanas con experiencias de compra únicas y diferenciadoras. Con sucursales en la Gran Caracas y un canal de compra en línea, más de 3.000 mil trabajadores se dan cita todos los días para servir con excelencia a la familia venezolana.
            </p>
          </div>
        </div>
        <div className="mx-auto flex flex-row flex-wrap justify-around w-full h-full align-top">
          {/* <h1 className="text-4xl text-center font-black w-full mb-1 h-10 mt-8">
            Conocenos
          </h1> */}
          <div className="flex flex-col shadow-lg w-[40%] p-8 rounded-xl min-w-96 m-4" style={{ minHeight: '250px' }}>
            <h1 className="text-2xl text-center font-black mb-1">
              Nuestra Mision
            </h1>
            <p>
              Ser el aliado estratégico de nuestros clientes corporativos y empresariales en el sector alimenticio. Brindándoles soluciones integrales a través de la distribución eficiente de productos de alta calidad, un servicio excepcional y un compromiso con la sostenibilidad.
            </p>
          </div>
          <div className="flex flex-col shadow-lg w-[40%] p-8 rounded-xl min-w-96 m-4" style={{ minHeight: '250px' }}>
            <h1 className="text-2xl text-center font-black mb-1">
              Nuestra Visión
            </h1>
            <p>
              Consolidarnos como la empresa mayorista de alimentos líder en Venezuela, reconocida por nuestra excelencia en la distribución, la innovación en la oferta de productos y el desarrollo de relaciones duraderas con nuestros clientes.
            </p>
          </div>
          <div className="flex flex-col shadow-lg w-[40%] p-8 rounded-xl min-w-96 m-4" style={{ minHeight: '250px' }}>
            <h1 className="text-2xl text-center font-black mb-1">
              Valores
            </h1>
            <p>
              Ser el aliado estratégico de nuestros clientes corporativos y empresariales en el sector alimenticio. Brindándoles soluciones integrales a través de la distribución eficiente de productos de alta calidad, un servicio excepcional y un compromiso con la sostenibilidad.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
