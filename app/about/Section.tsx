import Image from 'next/image';

interface SectionProps {
  title: string;
  content: string | string[];
  imageSrc: string;
  imageAlt: string;
  animateFrom: 'left' | 'right';
}

export default function Section({ title, content, imageSrc, imageAlt }: SectionProps) {

  return (
    <div
      className="flex md:w-[30%] w-[90%] relative items-start justify-start mt-8"
      style={{ aspectRatio: '1/1' }}
    >
      <div className='w-full h-full'>
        <Image
          width={554}
          height={324}
          style={{
            objectFit: 'cover',
            aspectRatio: '1/1',
            height: '100%'
          }}
          src={imageSrc}
          alt={imageAlt}
          className='rounded-xl m-auto'
        />
      </div>
      <div className="w-full h-full z-10 shadow-lg rounded-xl absolute bottom-0 p-6 py-8 text-white flex flex-col justify-end" style={{ background: 'linear-gradient(rgba(17,22,27,0) 0,#11161b 100%)' }}>
        <h1 className="text-2xl text-start font-black mb-1">
          {title}
        </h1>
        {title === 'Valores' && typeof content === 'object' &&
            <ul>
                {content.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}                
            </ul>
        }
        {title !== 'Valores' &&
            <p className='mt-2'>{content}</p>
        }
      </div>
    </div>
  );
}
