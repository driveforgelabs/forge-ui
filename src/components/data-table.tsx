import {
  createPaginatedRowModel,
  createSortedRowModel,
  flexRender,
  type ReactTable,
  type RowData,
  rowPaginationFeature,
  rowSortingFeature,
  type ColumnDef as TSColumnDef,
  tableFeatures,
  useTable,
} from "@tanstack/react-table"
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import type * as React from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
})

type ColumnDef<T extends RowData> = TSColumnDef<typeof features, T>
type Instance<T extends RowData> = ReactTable<typeof features, T>
type HeaderOf<T extends RowData> = ReturnType<
  Instance<T>["getHeaderGroups"]
>[number]["headers"][number]
type RowOf<T extends RowData> = ReturnType<Instance<T>["getRowModel"]>["rows"][number]
type SortDirection = false | "asc" | "desc"

type DataTableProps<T extends RowData> = {
  columns: ColumnDef<T>[]
  data: T[]
  /** Rows per page; omit to disable pagination. */
  pageSize?: number
  loading?: boolean
  emptyText?: React.ReactNode
  onRowClick?: (row: T) => void
  className?: string
}

function ariaSort(dir: SortDirection) {
  if (dir === "asc") return "ascending"
  if (dir === "desc") return "descending"
  return undefined
}

function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") return <ArrowUpIcon />
  if (direction === "desc") return <ArrowDownIcon />
  return <ArrowUpDownIcon className="opacity-50" />
}

function HeaderCell<T extends RowData>({ header }: { header: HeaderOf<T> }) {
  const direction = header.column.getIsSorted()
  const label = flexRender(header.column.columnDef.header, header.getContext())
  let content: React.ReactNode = label
  if (header.isPlaceholder) {
    content = null
  } else if (header.column.getCanSort()) {
    content = (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8"
        onClick={() => header.column.toggleSorting()}
      >
        {label}
        <SortIcon direction={direction} />
      </Button>
    )
  }
  return <TableHead aria-sort={ariaSort(direction)}>{content}</TableHead>
}

function SkeletonRows({ rows, columns }: { rows: number; columns: number }) {
  const rowIds = Array.from({ length: rows }, (_, i) => `skeleton-row-${i}`)
  const cellIds = Array.from({ length: columns }, (_, i) => `skeleton-cell-${i}`)
  return rowIds.map((rowId) => (
    <TableRow key={rowId}>
      {cellIds.map((cellId) => (
        <TableCell key={cellId}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ))
}

type BodyProps<T extends RowData> = {
  rows: RowOf<T>[]
  loading: boolean
  skeletonRows: number
  columnCount: number
  emptyText: React.ReactNode
  onRowClick: ((row: T) => void) | undefined
}

function Body<T extends RowData>({
  rows,
  loading,
  skeletonRows,
  columnCount,
  emptyText,
  onRowClick,
}: BodyProps<T>) {
  if (loading) return <SkeletonRows rows={skeletonRows} columns={columnCount} />
  if (rows.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={columnCount} className="h-24 text-center text-muted-foreground">
          {emptyText}
        </TableCell>
      </TableRow>
    )
  }
  return rows.map((row) => (
    <TableRow
      key={row.id}
      className={onRowClick ? "cursor-pointer" : undefined}
      onClick={() => onRowClick?.(row.original)}
    >
      {row.getAllCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  ))
}

function Pagination<T extends RowData>({ table }: { table: Instance<T> }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">
        Página{" "}
        <span className="font-mono tabular-nums">{table.state.pagination.pageIndex + 1}</span> de{" "}
        <span className="font-mono tabular-nums">{table.getPageCount()}</span>
      </span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <ChevronLeftIcon /> Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          Seguinte <ChevronRightIcon />
        </Button>
      </div>
    </div>
  )
}

/** Sortable, paginated table on TanStack Table v9. Sort by clicking a header whose column has `enableSorting`. */
function DataTable<T extends RowData>({
  columns,
  data,
  pageSize,
  loading = false,
  emptyText = "Sem resultados.",
  onRowClick,
  className,
}: DataTableProps<T>) {
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: !pageSize,
    initialState: { pagination: { pageIndex: 0, pageSize: pageSize ?? 10 } },
  })

  return (
    <div data-slot="data-table" className={cn("grid gap-3", className)}>
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            <Body
              rows={table.getRowModel().rows}
              loading={loading}
              skeletonRows={pageSize ?? 4}
              columnCount={columns.length}
              emptyText={emptyText}
              onRowClick={onRowClick}
            />
          </TableBody>
        </Table>
      </div>
      {pageSize && !loading && table.getPageCount() > 1 ? <Pagination table={table} /> : null}
    </div>
  )
}

export { type ColumnDef, DataTable }
