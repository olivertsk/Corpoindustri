'use client';

import { Pagination } from '@mui/material';

type PaginatorProps = {
  count: number;
  onChange: (page: number) => void;
};
export default function Paginator({ count, onChange }: PaginatorProps) {
  return (
    <Pagination
      onChange={(_, page) => onChange(page)}
      count={count}
      variant='outlined'
      shape='rounded'
      size='small'
    />
  );
}
