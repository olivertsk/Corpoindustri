import { Pagination, Select, MenuItem, Box, Typography } from '@mui/material';

const CustomPagination = ({
  page,
  pageCount,
  onPageChange,
  pageSize,
  rowCount,
  onPageSizeChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
  rowCount: number;
  onPageSizeChange: (newSize: number) => void;
}) => {
  const from = page * pageSize + 1;
  const to = Math.min((page + 1) * pageSize, rowCount);

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      gap={2}
      padding={2}
      width='100%'
      flexWrap='wrap'
    >
      {/* Selector de filas por página */}
      <Box display='flex' alignItems='center' gap={1}>
        <Select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          size='small'
          sx={{ minWidth: 80 }}
        >
          {[10, 20, 30, 40, 50].map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Paginación y contador */}
      <Box display='flex' alignItems='center' gap={2}>
        <Pagination
          count={pageCount}
          page={page + 1}
          onChange={(_, newPage) => onPageChange(newPage - 1)}
          color='primary'
          showFirstButton
          showLastButton
        />

        <Typography variant='body2' sx={{ whiteSpace: 'nowrap' }}>
          {from}–{to} de {rowCount}
        </Typography>
      </Box>
    </Box>
  );
};

export default CustomPagination;
