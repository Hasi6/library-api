import { Loader, Table } from '@mantine/core';
import { useEffect, useRef } from 'react';

import PaginationContainer from '@/components/molecules/Pagination';
import { Meta } from '@/hooks/useQuery';

namespace TableContainer {
  export interface Column<TAttributes> {
    id: string;
    label?: string;
    onClick?: Function;
    render?: (attributes: TAttributes) => React.ReactNode;
    renderHeader?: () => React.ReactNode;
    width?: number;
  }
}

interface Props<TAttributes> {
  columns: TableContainer.Column<TAttributes>[];
  data: TAttributes[];
  onSelectAll?: (status: boolean) => void;
  loading?: boolean;
  meta: Meta | null;
  selectStatus?: 'full' | 'partial' | null;
  selectedIds?: string[];
}

function TableContainer<TAttributes>({
  columns,
  data,
  loading,
  meta,
  onSelectAll,
  selectStatus,
}: Props<TAttributes>): JSX.Element {
  const cRef = useRef<any>();

  useEffect(() => {
    if (cRef.current) {
      cRef.current.indeterminate = selectStatus === 'partial';
    }
  }, [cRef, selectStatus]);

  const ths = () => {
    return (
      <tr>
        {columns.map((column) => (
          <th key={column.id}>
            {column.id === 'checkbox' ? (
              <>
                <input
                  type='checkbox'
                  checked={selectStatus === 'full'}
                  className='cursor-pointer w-[17px] h-[17px]'
                  onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                  ref={cRef}
                />
              </>
            ) : (
              <div className='flex'>
                <div className='my-auto'>
                  {column.renderHeader ? column.renderHeader() : column.label}
                </div>
              </div>
            )}
          </th>
        ))}
      </tr>
    );
  };

  const rows = () => {
    return (
      <>
        {loading ? (
          <tr>
            <td
              className='w-full mx-auto'
              colSpan={Object.keys(columns).length}
            >
              <Loader className='mt-[20px] h-[200px] mx-auto' />
            </td>
          </tr>
        ) : (
          <>
            {data.length > 0 ? (
              data.map((da, index) => (
                <tr key={index}>
                  {columns.map((column) => (
                    <td key={column.id}>
                      {/* @ts-ignore */}
                      {column.render ? column.render(da) : da?.[column.id]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className='py-[20px]'>
                <td
                  colSpan={columns.length}
                  className='mx-auto text-center my-[20px]'
                >
                  No Results
                </td>
              </tr>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Table className='my-[10px]'>
        <thead>{ths()}</thead>
        <tbody>{rows()}</tbody>
      </Table>
      {meta && (
        <div className='mx-auto my-[20px] w-[400px]'>
          <PaginationContainer total={meta?.totalPages} />
        </div>
      )}
    </>
  );
}

export default TableContainer;
