'use client';

import { Pagination } from '@mui/material';

export default function Paginator() {
  return (
    <Pagination
      onChange={() => {}}
      count={10}
      variant='outlined'
      shape='rounded'
      size='small'
    />
  );
}
