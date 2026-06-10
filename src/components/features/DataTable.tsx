import React from 'react';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  loading?: boolean;
}

function DataTable<T extends Record<string, unknown>>({
  data, columns, emptyMessage = 'No data available.', loading = false,
}: DataTableProps<T>) {
  return (
    <div className="bg-white rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-border bg-brand-surface">
              {columns.map(col => (
                <th key={String(col.key)} className="text-left text-xs font-semibold text-muted-foreground px-5 py-3 uppercase tracking-wide" style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-border/50">
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-5 py-4">
                      <div className="skeleton h-4 rounded-lg" style={{ width: `${60 + (i % 3) * 15}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-brand-surface/30 transition-colors">
                  {columns.map(col => (
                    <td key={String(col.key)} className="px-5 py-4">
                      {col.render ? col.render(row) : <span className="text-sm">{String(row[col.key as keyof T] ?? '')}</span>}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
