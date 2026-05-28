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
import { getCategories } from '@/src/api/CategoriesApi';
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
  facets?: {
    brands: { name: string; count: number }[];
    units: { name: string; count: number }[];
    models: { name: string; count: number }[];
  };
};

type FilteredCategories = {
  departmentName: string;
  departmentId: string;
  categories: ICategory[];
};

export default function Accordion({
  setFilters,
  filters,
  facets,
}: AccordionProps) {
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

  const selectedDepartmentIds = useMemo(
    () => filters.departmentIds?.toString() || null,
    [filters.departmentIds],
  );

  const { data: categoriesData, isFetching: isFetchingCategories } = useQuery({
    queryKey: [
      'categories_by_filters',
      filters.search,
      filters.minPrice,
      filters.maxPrice,
      filters.typePrice,
      selectedDepartmentIds,
    ],
    queryFn: () =>
      getCategories({
        // Keep categories query aligned with the departments filter payload.
        productName: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        typePrice: filters.typePrice,
        isClient: true,
        // Apply selected departments so this query changes on selection changes.
        departmentIds: selectedDepartmentIds || undefined,
      }),
    enabled: !!filters.departmentIds?.length,
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

  const handleFacetFilter = (
    facetType: 'brand' | 'unit' | 'model',
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      pag: 1,
      [facetType]: prev[facetType] === value ? null : value,
    }));
  };

  const navigate = useRouter();
  const applyFilters = () => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (Array.isArray(value)) {
        if (value.length) {
          params.append(key, value.toString());
        }
      } else {
        if (key === 'pag') {
          params.append(key, '1');
        } else if (
          value !== '' &&
          value !== null &&
          value !== undefined &&
          key !== 'isClient' &&
          key !== 'typePrice'
        ) {
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
    if (!data || !categoriesData || !filters.departmentIds?.length) {
      setCategories([]);
      return;
    }

    const categoriesByDepartment = new Map<string, ICategory[]>();
    categoriesData.data.forEach((category) => {
      if (!category.departmentId) {
        return;
      }
      const previous = categoriesByDepartment.get(category.departmentId) || [];
      categoriesByDepartment.set(category.departmentId, [
        ...previous,
        category,
      ]);
    });

    const nextCategories = filters.departmentIds
      .filter((departmentId): departmentId is string => !!departmentId)
      .map((departmentId) => {
        const department = data.data.find((item) => item.id === departmentId);
        if (!department) {
          return null;
        }

        return {
          departmentName: department.name!,
          departmentId,
          categories: categoriesByDepartment.get(departmentId) || [],
        };
      })
      .filter((item): item is FilteredCategories => item !== null);

    setCategories(nextCategories);
  }, [data, categoriesData, filters.departmentIds]);

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
                          {department.name}{' '}
                          {department.productCount
                            ? `(${department.productCount})`
                            : ''}
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
              {isFetchingCategories && (
                <span className='block text-xs font-normal text-primary'>
                  Actualizando categorias...
                </span>
              )}
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  {isFetchingCategories && (
                    <div className='accordion-content px-4 py-2 text-sm text-slate-500'>
                      Consultando categorias...
                    </div>
                  )}
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
                            {category.name}{' '}
                            {category.productCount
                              ? `(${category.productCount})`
                              : ''}
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

          <div className='accordion-item'>
            <input
              id='accordion-trigger-4'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-4'
            >
              Marcas
              <span className='block text-xs font-normal'>
                Seleccionadas ({filters.brand ? 1 : 0})
              </span>
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content p-4'>
                    {!facets?.brands?.length && (
                      <p className='text-sm text-slate-500'>Sin resultados</p>
                    )}
                    {facets?.brands?.map((brand) => (
                      <label
                        key={`brand-${brand.name}`}
                        className='flex items-center gap-2 py-2 text-sm'
                        htmlFor={`facet-brand-${brand.name}`}
                      >
                        <input
                          id={`facet-brand-${brand.name}`}
                          type='radio'
                          name='facet-brand-selection'
                          checked={filters.brand === brand.name}
                          readOnly
                          onClick={() => handleFacetFilter('brand', brand.name)}
                        />
                        {brand.name} ({brand.count})
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className='accordion-item'>
            <input
              id='accordion-trigger-5'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-5'
            >
              Unidades
              <span className='block text-xs font-normal'>
                Seleccionadas ({filters.unit ? 1 : 0})
              </span>
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content p-4'>
                    {!facets?.units?.length && (
                      <p className='text-sm text-slate-500'>Sin resultados</p>
                    )}
                    {facets?.units?.map((unit) => (
                      <label
                        key={`unit-${unit.name}`}
                        className='flex items-center gap-2 py-2 text-sm'
                        htmlFor={`facet-unit-${unit.name}`}
                      >
                        <input
                          id={`facet-unit-${unit.name}`}
                          type='radio'
                          name='facet-unit-selection'
                          checked={filters.unit === unit.name}
                          readOnly
                          onClick={() => handleFacetFilter('unit', unit.name)}
                        />
                        {unit.name} ({unit.count})
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className='accordion-item'>
            <input
              id='accordion-trigger-6'
              className='accordion-trigger-input'
              type='checkbox'
            ></input>
            <label
              className='accordion-trigger font-bold uppercase'
              htmlFor='accordion-trigger-6'
            >
              Modelos
              <span className='block text-xs font-normal'>
                Seleccionadas ({filters.model ? 1 : 0})
              </span>
            </label>
            <section className='accordion-animation-wrapper'>
              <div className='accordion-animation'>
                <div className='accordion-transform-wrapper'>
                  <div className='accordion-content p-4'>
                    {!facets?.models?.length && (
                      <p className='text-sm text-slate-500'>Sin resultados</p>
                    )}
                    {facets?.models?.map((model) => (
                      <label
                        key={`model-${model.name}`}
                        className='flex items-center gap-2 py-2 text-sm'
                        htmlFor={`facet-model-${model.name}`}
                      >
                        <input
                          id={`facet-model-${model.name}`}
                          type='radio'
                          name='facet-model-selection'
                          checked={filters.model === model.name}
                          readOnly
                          onClick={() => handleFacetFilter('model', model.name)}
                        />
                        {model.name} ({model.count})
                      </label>
                    ))}
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
