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
import { ICategory } from '@/src/types/category';
import { fxAllBanner } from '@/src/api/BannerApi';
import { EPositionBanner, IBanner } from '@/src/types/banner';
import BannerSliderFilter from '../search/BannerSliderFilter';

type AccordionProps = {
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
  filters: ProductFilters;
};

type FilteredCategories = {
  departmentName: string;
  departmentId: string;
  categories: ICategory[];
};

export default function Accordion({ setFilters, filters }: AccordionProps) {
  // const queryParams = new URLSearchParams(window.location.search);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenStyles = useMemo(
    () =>
      isOpen ? 'opacity-100 translate-x-0' : '-translate-x-full opacity-0 ',
    [isOpen],
  );

  const handleFilter = () => {
    setIsOpen(!isOpen);
  };

  /** VALIDATE MATCH MEDIA TO SHOW THE FILTERS */
  const [isMobile, setIsMobile] = useState(false);
  const [filteredCategories, setCategories] = useState<FilteredCategories[]>(
    [],
  );

  const { data: filterBanner } = useQuery<IBanner[]>({
    queryKey: ['filter_banner'],
    queryFn: () =>
      fxAllBanner({
        position: EPositionBanner.Filter,
        isClient: true,
      }),
    refetchOnWindowFocus: false,
  });

  const { data } = useQuery({
    queryKey: ['departments'],
    queryFn: () =>
      getDepartments({
        categories: true,
        productName: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        categoriesIds: filters.categoriesIds?.toString() || null,
        typePrice: filters.typePrice,
        isClient: true,
      }),
    refetchOnWindowFocus: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleDepartmentsIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const department = data?.data.find(
      (department) => department.id!.toString() === e.target.value.toString(),
    );
    if (filters.departmentIds?.includes(e.target.value)) {
      const filteredDepartments = filters.departmentIds.filter(
        (filter) => filter !== e.target.value,
      );
      const categoriesIds: string[] = [];
      setCategories(
        filteredCategories.filter(
          (category) => category.departmentId !== e.target.value,
        ),
      );
      filters.categoriesIds?.forEach((categoryId) => {
        if (
          !department!.categories!.find(
            (departmentCategoryId) => categoryId === departmentCategoryId.id!,
          )
        ) {
          categoriesIds.push(categoryId);
        }
      });
      setFilters({
        ...filters,
        departmentIds: filteredDepartments,
        categoriesIds,
      });
    } else {
      setCategories([
        ...filteredCategories,
        {
          departmentName: department!.name!,
          departmentId: department!.id!,
          categories: department!.categories!,
        },
      ]);
      setFilters({
        ...filters,
        departmentIds: [...filters.departmentIds!, e.target.value],
      });
    }
  };
  const handleCategoriesIds = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (filters.categoriesIds?.includes(e.target.value)) {
      setFilters({
        ...filters,
        categoriesIds: filters.categoriesIds?.filter(
          (categoryId) => categoryId !== e.target.value,
        ),
      });
    } else {
      setFilters({
        ...filters,
        categoriesIds: [...filters.categoriesIds!, e.target.value],
      });
    }
  };

  const navigate = useRouter();
  const applyFilters = () => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        params.append(key, value.toString());
      } else {
        if (key === 'pag') {
          params.append(key, '1');
        } else {
          params.append(key, value + '');
        }
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

  useEffect(() => {
    if (data) {
      const filteredCategories: FilteredCategories[] = [];
      filters.departmentIds?.forEach((departmentId) => {
        const department = data.data.find(
          (department) => department.id === departmentId,
        );
        if (department) {
          filteredCategories.push({
            departmentName: department.name!,
            departmentId: department.id!,
            categories: department.categories!,
          });
        }
      });
      setCategories(filteredCategories);
    }
  }, [data]);

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
          }  h-full lg:w-full border-r-primary shadow-md overflow-auto lg:overflow-hidden divide-y-2 border-r-8  lg:border-none transition-all bg-white lg:rounded-md rounded-r-xl `}
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
              Departamentos
              <span className='block text-xs font-normal'>
                Departamentos seleccionadas ({filters.departmentIds?.length})
              </span>
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
                              department.id,
                            )}
                          />
                          {department.name} ({department.productCount})
                        </label>
                      </div>
                    ))}
                </div>
              </div>
            </section>
          </div>
          <div
            className={`accordion-item ${
              !filteredCategories.length && 'pointer-events-none opacity-40'
            }`}
          >
            <input
              id='accordion-trigger-2'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-2'
            >
              Categorias
              {!filters.departmentIds?.length ? (
                <span className='block text-xs font-normal'>
                  Debes seleccionar al menos un departamento
                </span>
              ) : (
                <span className='block text-xs font-normal'>
                  Categorias seleccionadas ({filters.categoriesIds?.length})
                </span>
              )}
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  {filteredCategories &&
                    filteredCategories.map((category) => (
                      <div
                        key={category.departmentId}
                        className='accordion-content py-2'
                      >
                        <label htmlFor='' className='px-4 font-bold'>
                          {category.departmentName}
                        </label>
                        {category.categories.map((category) => (
                          <label
                            className='flex items-center gap-2 p-4 pl-8 hover:bg-primary/50 hover:text-white'
                            key={category.id}
                            htmlFor={`${category.name}${category.id}`}
                          >
                            <input
                              type='checkbox'
                              id={`${category.name}${category.id}`}
                              onChange={handleCategoriesIds}
                              value={category.id}
                              checked={filters.categoriesIds?.includes(
                                category.id,
                              )}
                            />
                            {category.name}
                          </label>
                        ))}
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
          {filterBanner && (
            <div className='pb-8 lg:hidden max-w-[90%] mx-auto'>
              <div className='mt-4 rounded-md overflow-hidden'>
                <BannerSliderFilter slides={filterBanner} />
              </div>
            </div>
          )}
        </div>
        {filterBanner && (
          <div className='mt-4 rounded-md overflow-hidden'>
            <BannerSliderFilter slides={filterBanner} />
          </div>
        )}
      </section>
    </>
  );
}
