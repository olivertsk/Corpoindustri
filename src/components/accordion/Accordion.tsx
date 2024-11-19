'use client';

import React, { useEffect, useMemo, useState } from 'react';
import './Accordion.css';

export default function Accordion() {
  const queryParams = new URLSearchParams(window.location.search);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenStyles = useMemo(
    () =>
      isOpen ? 'opacity-100 translate-x-0' : '-translate-x-full opacity-0 ',
    [isOpen]
  );

  const handleFilter = () => {
    setIsOpen(!isOpen);
  };

  /** VALIDATE MATCH MEDIA TO SHOW THE FILTERS */
  const [isMobile, setIsMobile] = useState(false);
  const matchMedia = window.matchMedia('(max-width: 1024px)');
  useEffect(() => {
    if (matchMedia.matches) {
      setIsMobile(matchMedia.matches);
    }
    matchMedia.addEventListener('change', (e) => {
      setIsMobile(e.matches);
    });
  }, []);

  return (
    <>
      <button
        onClick={handleFilter}
        className='flex lg:hidden bg-accent-100 py-2 px-4 rounded-md font-bold gap-2'
      >
        Filtrar
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='1.5'
            d='M4.5 7h15M7 12h10m-7 5h4'
          />
        </svg>
      </button>
      <p className='mb-4 text-xl'>
        Busqueda: <strong>{queryParams.get('q')}</strong>{' '}
      </p>
      <section
        className={`fixed left-0 top-0 lg:relative  h-screen  lg:h-auto z-10 ${
          isMobile && isOpenStyles
        } transition-all duration-300 ease-in-out`}
      >
        <div
          onClick={handleFilter}
          className={`absolute w-full h-full lg:hidden block transition-all delay-150 ${
            isOpen ? 'bg-black/40' : 'bg-transparent'
          }`}
        ></div>
        <div
          className={`accordion relative ${
            isMobile && isOpen ? 'w-[75%]' : !isMobile ? 'w-[100%]' : 'w-[0%]'
          }  h-full lg:w-full border-r-primary shadow-md overflow-hidden divide-y-2 border-r-8  lg:border-none transition-all bg-white lg:rounded-md rounded-r-xl `}
        >
          {isMobile && (
            <button
              onClick={handleFilter}
              className='w-full flex justify-end p-3'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
              >
                <path
                  fill='currentColor'
                  d='M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z'
                />
              </svg>
            </button>
          )}
          <div className='accordion-item'>
            <input
              id='accordion-trigger-1'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-1'
            >
              Departamento
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content'>
                    <h2>Accordion content</h2>
                    <p>
                      This accordion content can be any height. It does not
                      require fixed max-height, or any ways of transitioning
                      height with Javascript.
                    </p>
                    <p>
                      This should function smoothly in newest Webkit/Chromium
                      browsers.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className='accordion-item'>
            <input
              id='accordion-trigger-2'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-2'
            >
              Categoria
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content'>
                    <h2>Accordion content</h2>
                    <p>
                      This accordion content can be any height. It does not
                      require fixed max-height, or any ways of transitioning
                      height with Javascript. This content could be as long as
                      it might and should resize and animate effortlessly.
                    </p>
                    <p>
                      This should function smoothly in newest Webkit/Chromium
                      browsers.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className='accordion-item'>
            <input
              id='accordion-trigger-3'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-3'
            >
              Precio
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content'>
                    <h2>Accordion content</h2>
                    <p>
                      This accordion content can be any height. It does not
                      require fixed max-height, or any ways of transitioning
                      height with Javascript.
                    </p>
                    <p>
                      This should function smoothly in newest Webkit/Chromium
                      browsers.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
