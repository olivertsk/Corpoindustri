'use client';

import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Product } from '@/src/types/product';

export default function ProductBreadcrumb({ product }: { product: Product }) {
  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Link underline='hover' color='inherit' href='/'>
          {product.department?.name}
        </Link>
        <Link
          underline='hover'
          color='inherit'
          href='/material-ui/getting-started/installation/'
        >
          {product.category?.name}
        </Link>
        <Typography sx={{ color: 'text.primary' }}>{product.name}</Typography>
      </Breadcrumbs>
    </div>
  );
}
