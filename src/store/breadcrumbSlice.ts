import { StateCreator } from 'zustand';

export type BreadcrumbSliceType = {
  breadcrumb: string;
  secondBreadcrumb?: string;
  setBreadcrumb: (name: string, secondBreadcrumb?: string) => void;
};

export const createBreadcrumbSlice: StateCreator<
  BreadcrumbSliceType,
  [],
  [],
  BreadcrumbSliceType
> = (set) => ({
  breadcrumb: '',
  secondBreadcrumb: '',
  setBreadcrumb: (name, secondBreadcrumb = '') => {
    set({
      breadcrumb: name,
      secondBreadcrumb,
    });
  },
});
