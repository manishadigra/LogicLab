
'use client';

import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { TrendData, trendData as allTrendData } from '@/app/lib/data';
import { useFilters } from '@/contexts/filter-context';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { PlatformIcon } from '../icons';

const fuzzyFilter = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({ itemRank });
  return itemRank.passed;
};

export function DetailedTrendTable() {
  const { selectedCategory, selectedPlatform, selectedRegion } = useFilters();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const data = useMemo(() => {
    let filteredData = allTrendData;

    if (selectedCategory) {
      filteredData = filteredData.filter(
        (item) => item.category === selectedCategory
      );
    }
    if (selectedPlatform) {
      filteredData = filteredData.filter(
        (item) => item.platform === selectedPlatform
      );
    }
    if (selectedRegion) {
      filteredData = filteredData.filter(
        (item) => item.region === selectedRegion
      );
    }

    return filteredData;
  }, [selectedCategory, selectedPlatform, selectedRegion]);

  const columns: ColumnDef<TrendData>[] = useMemo(
    () => [
      {
        accessorKey: 'keyword',
        header: 'Keyword',
        cell: (info) => (
          <span className="font-medium">{info.getValue() as string}</span>
        ),
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
      {
        accessorKey: 'platform',
        header: 'Platform',
        cell: (info) => {
            const platformName = info.getValue() as string;
            const category = info.row.original.category;
            return (
              <div className="flex items-center gap-2">
                <PlatformIcon category={category} className="h-4 w-4" />
                <span>{platformName}</span>
              </div>
            );
          },
      },
      {
        accessorKey: 'interestScore',
        header: () => <div className="text-right">Interest Score</div>,
        cell: (info) => {
          const score = info.getValue() as number;
          return (
            <div className="flex items-center justify-end gap-2">
              <span className="text-right font-medium">{score}/10</span>
              <div className="w-20 h-2 rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${score * 10}%` }}
                />
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'region',
        header: 'Region',
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div>
        <div className="flex items-center py-4">
            <Input
            placeholder="Search keywords..."
            value={globalFilter ?? ''}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="max-w-sm"
            />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
