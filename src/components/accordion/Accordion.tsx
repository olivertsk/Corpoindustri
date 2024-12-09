'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './Accordion.css';
import { useQuery } from '@tanstack/react-query';
import { getDepartments } from '@/src/api/DepartmentsApi';
import { ProductFilters } from '@/src/api/ProductApi';
import { useRouter } from 'next/navigation';
import { inputStlyes, primaryBtn } from '@/src/lib/global';

type AccordionProps = {
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
  filters: ProductFilters;
};

export default function Accordion({ setFilters, filters }: AccordionProps) {
  // const queryParams = new URLSearchParams(window.location.search);
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

  const { data } = useQuery({
    queryKey: ['departments'],
    queryFn: () => getDepartments(undefined),
    refetchOnWindowFocus: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentsIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filters.departmentIds?.includes(e.target.value)) {
      setFilters({
        ...filters,
        departmentIds: filters.departmentIds.filter(
          (filter) => filter !== e.target.value
        ),
      });
    } else {
      setFilters({
        ...filters,
        departmentIds: [...filters.departmentIds!, e.target.value],
      });
    }
  };
  const navigate = useRouter();
  const applyFilters = () => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      console.log(key, value);
      if (Array.isArray(value)) {
        params.append(key, value.toString());
      } else {
        params.append(key, value + '');
      }
    }
    navigate.replace(`/search?${params.toString()}`);
    handleFilter();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const matchMedia = window.matchMedia('(max-width: 1024px)');

      if (matchMedia.matches) {
        setIsMobile(matchMedia.matches);
      }
      matchMedia.addEventListener('change', (e) => {
        setIsMobile(e.matches);
      });
    }
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

      <section
        className={`fixed left-0 top-0 lg:relative  h-screen  lg:h-auto z-10 w-full ${
          isMobile && isOpenStyles
        } transition-all duration-300 ease-in-out z-30 lg:z-0`}
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
                  {data &&
                    data.data.map((department) => (
                      <div key={department.id} className='accordion-content'>
                        <label
                          className='flex items-center gap-2 p-4 hover:bg-primary/50 hover:text-white'
                          htmlFor={`${department.name}${department.id}`}
                        >
                          <input
                            type='checkbox'
                            id={`${department.name}${department.id}`}
                            onChange={handleDepartmentsIds}
                            value={department.id}
                            checked={filters.departmentIds?.includes(
                              department.id
                            )}
                          />
                          {department.name}
                        </label>
                      </div>
                    ))}
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
                  <div className='accordion-content flex flex-col gap-4 p-4'>
                    <label className='items-center gap-2'>
                      Desde
                      <div className='flex items-center gap-2'>
                        <input
                          type='number'
                          className={inputStlyes}
                          placeholder='10$'
                          name='minPrice'
                          value={filters.minPrice!}
                          onChange={handleChange}
                        />
                        <span className='text-lg font-bold'>$</span>
                      </div>
                    </label>
                    <label className='items-center gap-2'>
                      Hasta
                      <div className='flex items-center gap-2'>
                        <input
                          type='number'
                          className={inputStlyes}
                          placeholder='10$'
                          name='maxPrice'
                          value={filters.maxPrice!}
                          onChange={handleChange}
                        />
                        <span className='text-lg font-bold'>$</span>
                      </div>
                    </label>

                    <label className='items-center flex gap-2'>
                      <input
                        type='radio'
                        name='order'
                        value='maxPrice'
                        onChange={handleChange}
                      />
                      Mayor Precio
                    </label>
                    <label className='items-center flex gap-2'>
                      <input
                        type='radio'
                        name='order'
                        value='minPrice'
                        onChange={handleChange}
                      />
                      Menor Precio
                    </label>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className='flex justify-center p-4'>
            <button
              onClick={applyFilters}
              className={`${primaryBtn} !rounded-full`}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
