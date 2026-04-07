import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'right' | 'center';
  render?: (row: T) => ReactNode;
}

const SKELETON_ROWS = 5;
const SKELETON_WIDTHS = ['60%', '80%', '50%', '70%', '45%'];

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  headerRight?: ReactNode;
  title?: string;
  footer?: ReactNode;
  isLoading?: boolean;
}

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
  headerRight,
  title,
  footer,
  isLoading = false,
}: DataTableProps<T>) {
  return (
    <div className='bg-card rounded-card border border-border overflow-hidden'>
      {(title || headerRight) && (
        <div className='px-[18px] py-3 border-b border-border flex items-center justify-between'>
          {title && <span className='text-[13px] font-semibold'>{title}</span>}
          {headerRight}
        </div>
      )}
      <table className='w-full border-collapse table-fixed'>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width, textAlign: col.align ?? 'left' }}
                className='bg-border-light text-[11px] font-semibold text-secondary uppercase tracking-[0.4px] py-[9px] px-4 border-b border-border whitespace-nowrap'
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: SKELETON_ROWS }).map((_, rowIdx) => (
                <tr
                  key={rowIdx}
                  className='border-b border-border last:border-b-0'
                >
                  {columns.map((col, colIdx) => (
                    <td key={col.key} className='py-3 px-4 align-middle'>
                      <div
                        className='animate-pulse rounded bg-border h-[21px] w-full'
                        // style={{
                        //   width:
                        //     SKELETON_WIDTHS[colIdx % SKELETON_WIDTHS.length],
                        // }}
                      />
                    </td>
                  ))}
                </tr>
              ))
            : data.map((row, idx) => (
                <tr
                  key={idx}
                  onClick={() => onRowClick?.(row)}
                  className='border-b border-border cursor-pointer transition-colors hover:bg-[#F8F9FF] last:border-b-0'
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className='py-3 px-4 text-[14px] align-middle'
                      style={col.align ? { textAlign: col.align } : undefined}
                    >
                      {col.render
                        ? col.render(row)
                        : String(
                            (row as Record<string, unknown>)[col.key] ?? ''
                          )}
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      {!isLoading && footer}
    </div>
  );
}
