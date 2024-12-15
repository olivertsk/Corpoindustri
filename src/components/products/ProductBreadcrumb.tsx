'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Product } from '@/src/types/product';

export default function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <div className='pl-4'>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' href='/' className='!text-sm'>
          {product.department?.name}
        </Link>
        <Link
          className='!text-sm'
          underline='hover'
          color='inherit'
          href='/material-ui/getting-started/installation/'
        >
          {product.category?.name}
        </Link>
        <Typography className='!text-sm' sx={{ color: 'text.primary' }}>
          {product.name}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}
