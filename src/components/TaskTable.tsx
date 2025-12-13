import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridPaginationModel,
  GridRowParams,
  GridRowSelectionModel,
  GridRowsProp,
  GridFilterModel,
  GridSortModel,
} from '@mui/x-data-grid';
import CustomPagination from './CustomPagination';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';

type TaskTableProps<T> = {
  rows: GridRowsProp;
  columns: GridColDef[];
  rowCount: number;
  pageSize: number;
  page: number;
  isLoading: boolean;
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  onRowClick: (ev: GridRowParams) => void;
  onRowSelectionModelChange?:
    | ((
        rowSelectionModel: GridRowSelectionModel,
        details: GridCallbackDetails
      ) => void)
    | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  processRowUpdate?: any;
  overflowX?: string;
  isLead?: boolean;
  filterModel?: GridFilterModel;
  setFilters: Dispatch<SetStateAction<T>>;
  filters: T;
  queryClientKey: string;
};

export default function TaskTable<T>({
  rows,
  columns,
  rowCount,
  pageSize,
  page,
  isLoading,
  checkboxSelection = false,
  disableRowSelectionOnClick = false,
  onRowClick,
  onRowSelectionModelChange,
  processRowUpdate,
  overflowX = 'hidden',
  isLead,
  filterModel,
  setFilters,
  filters,
  queryClientKey,
}: TaskTableProps<T>) {
  const filterDebounceRef = useRef<number | null>(null);
  const handlePageSizeChange = (newSize: number) => {
    // Cuando cambia el tamaño de página, volvemos a la primera página
    handlePagination({ page: 0, pageSize: newSize });
  };

  const queryClient = useQueryClient();
  const handlePagination = (model: GridPaginationModel) => {
    setFilters({
      ...filters,
      pag: model.page + 1,
      limit: model.pageSize, // Actualizamos el límite
    });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryClientKey] });
    }, 500);
  };

  const handleFilterChange = (newFilterModel: GridFilterModel) => {
    try {
      const apiFilters = newFilterModel.items.map((filter) => {
        let value: unknown = filter.value;
        // Normalize boolean-like strings to actual booleans
        if (typeof value === 'string') {
          if (value.toLowerCase() === 'true') value = true;
          else if (value.toLowerCase() === 'false') value = false;
        }
        // Prefer 'is' operator for boolean filters to avoid backend mismatches
        const isBooleanValue = typeof value === 'boolean';
        const operator = isBooleanValue ? 'is' : filter.operator || 'contains';
        return {
          field: filter.field,
          operator,
          value: value === undefined ? '' : value,
        };
      });
      setFilters({
        ...filters,
        filters: JSON.stringify(
          apiFilters.map((f) => ({
            ...f,
            value: f.value === undefined ? '' : f.value,
          }))
        ),
      });
      if (filterDebounceRef.current) {
        clearTimeout(filterDebounceRef.current);
      }
      filterDebounceRef.current = window.setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [queryClientKey] });
      }, 300);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };

  const handleSortChange = (model: GridSortModel) => {
    setFilters({
      ...filters,
      sort: JSON.stringify(model),
    });
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey: [queryClientKey] });
    }, 500);
  };

  return (
    <>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          getRowId={(row) =>
            row.id ??
            row._id ??
            row.uuid ??
            row.key ??
            `${row.name}-${row.status}-${row.isSalient}`
          }
          sx={{
            '& .MuiDataGrid-columnHeaders .MuiDataGrid-row--borderBottom': {
              height: 'auto !important',
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#083e64',
              padding: '8px',
              color: '#fff',
            },
            '& .MuiIconButton-root': {
              color: '#fff',
            },
            '& .MuiDataGrid-iconButtonContainer .MuiButtonBase-root': {
              backgroundColor: '#083e64',
              color: '#fff',
            },
            '& .MuiDataGrid-row--notEditable': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            },
            overflowX: { overflowX },
          }}
          getRowClassName={(params) => {
            if ('isOpportunities' in params.row && isLead) {
              return params.row?.isOpportunities === true
                ? 'MuiDataGrid-row--notEditable'
                : '';
            }
            return '';
          }}
          paginationMode='server'
          sortingMode='server'
          filterMode='server'
          initialState={{}}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          onRowSelectionModelChange={onRowSelectionModelChange}
          loading={isLoading && rows.length === 0}
          // Safety: when filtering, ensure rowCount is not 0 if rows exist
          rowCount={rowCount || rows.length}
          rowHeight={48}
          columnHeaderHeight={32}
          onRowClick={onRowClick}
          pageSizeOptions={[10, 20, 30, 40, 50]} // Opciones disponibles
          paginationModel={{
            page,
            pageSize: pageSize,
          }}
          onPaginationModelChange={handlePagination}
          filterModel={filterModel} // Pasar modelo de filtros
          onFilterModelChange={handleFilterChange} // Manejar cambios de filtro
          onSortModelChange={handleSortChange}
          rows={rows}
          isCellEditable={(params) => {
            if (
              'isOpportunities' in params.row &&
              params.isEditable &&
              isLead
            ) {
              return !params.row.isOpportunities;
            }
            return true;
          }}
          columns={columns}
          processRowUpdate={processRowUpdate}
          slots={{
            pagination: () => (
              <CustomPagination
                page={page}
                pageCount={Math.ceil(rowCount / pageSize)}
                onPageChange={(newPage) =>
                  handlePagination({ page: newPage, pageSize })
                }
                pageSize={pageSize}
                rowCount={rowCount}
                onPageSizeChange={handlePageSizeChange}
              />
            ),
          }}
        />
      </div>
    </>
  );
}
