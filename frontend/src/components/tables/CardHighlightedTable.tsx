import React, { useState, useMemo } from 'react'
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

export type TableHeaderTheme = 'crimson' | 'blue' | 'green' | 'red' | 'purple' | 'dark'

export type RowIndicatorColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'crimson'

export interface ColumnDef<T> {
  id: string
  header: string
  accessorKey?: keyof T
  cell?: (row: T, index: number) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface CardHighlightedTableProps<T extends { id: string | number }> {
  columns: ColumnDef<T>[]
  data: T[]
  title?: string
  subtitle?: string
  headerTheme?: TableHeaderTheme
  getRowIndicatorColor?: (row: T) => RowIndicatorColor
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
  selectable?: boolean
  selectedRowIds?: (string | number)[]
  onSelectionChange?: (selectedIds: (string | number)[]) => void
  toolbarActions?: React.ReactNode
  rowActions?: (row: T) => React.ReactNode
  pageSizeOptions?: number[]
  initialPageSize?: number
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
}

export function CardHighlightedTable<T extends { id: string | number }>({
  columns,
  data,
  title,
  subtitle,
  headerTheme = 'crimson',
  getRowIndicatorColor,
  isLoading = false,
  error = null,
  onRetry,
  selectable = true,
  selectedRowIds: controlledSelectedIds,
  onSelectionChange,
  toolbarActions,
  rowActions,
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 10,
  searchPlaceholder = 'Search in table...',
  emptyMessage = 'No matching records found.',
  className,
}: CardHighlightedTableProps<T>) {
  // Local state for uncontrolled selection
  const [internalSelectedIds, setInternalSelectedIds] = useState<(string | number)[]>([])
  const selectedIds = controlledSelectedIds ?? internalSelectedIds

  // Search, sorting, pagination state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState<{ columnId: string; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(initialPageSize)

  // Column visibility
  const [visibleColumns, setVisibleColumns] = useState<Record<string, boolean>>(
    columns.reduce((acc, col) => ({ ...acc, [col.id]: true }), {})
  )
  const [showColumnPicker, setShowColumnPicker] = useState(false)

  // Header Theme Map
  const headerThemeMap: Record<TableHeaderTheme, { bg: string; text: string }> = {
    crimson: { bg: 'bg-[#C70234]', text: 'text-white' },
    blue: { bg: 'bg-[#1A73E8]', text: 'text-white' },
    green: { bg: 'bg-[#188038]', text: 'text-white' },
    red: { bg: 'bg-[#D93025]', text: 'text-white' },
    purple: { bg: 'bg-[#8430C9]', text: 'text-white' },
    dark: { bg: 'bg-[#202124]', text: 'text-white' },
  }

  const currentHeaderTheme = headerThemeMap[headerTheme] || headerThemeMap.crimson

  // Row Strip Colors
  const rowIndicatorMap: Record<RowIndicatorColor, string> = {
    blue: 'bg-[#4285F4]',     // Information / In Progress
    green: 'bg-[#34A853]',    // Completed / Success
    red: 'bg-[#EA4335]',      // Critical / Error
    yellow: 'bg-[#FBBC05]',   // Pending / Warning
    purple: 'bg-[#A142F4]',   // AI / Review
    crimson: 'bg-[#C70234]',  // Important / Brand
  }

  // Handle Selection
  const handleSelectRow = (id: string | number) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((item) => item !== id)
      : [...selectedIds, id]

    if (onSelectionChange) {
      onSelectionChange(next)
    } else {
      setInternalSelectedIds(next)
    }
  }

  // Handle Sort
  const handleSort = (columnId: string) => {
    setSortConfig((prev) => {
      if (prev?.columnId === columnId) {
        if (prev.direction === 'asc') return { columnId, direction: 'desc' }
        return null
      }
      return { columnId, direction: 'asc' }
    })
  }

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    if (!searchQuery.trim()) return data

    const query = searchQuery.toLowerCase().trim()
    return data.filter((row) =>
      columns.some((col) => {
        let val: any
        if (col.accessorKey) {
          val = row[col.accessorKey]
        }
        if (val !== undefined && val !== null) {
          return String(val).toLowerCase().includes(query)
        }
        return false
      })
    )
  }, [data, searchQuery, columns])

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const col = columns.find((c) => c.id === sortConfig.columnId)
      if (!col || !col.accessorKey) return 0

      const valA = a[col.accessorKey]
      const valB = b[col.accessorKey]

      if (valA === valB) return 0
      if (valA === null || valA === undefined) return 1
      if (valB === null || valB === undefined) return -1

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA
      }

      const strA = String(valA).toLowerCase()
      const strB = String(valB).toLowerCase()
      return sortConfig.direction === 'asc'
        ? strA.localeCompare(strB)
        : strB.localeCompare(strA)
    })
  }, [filteredData, sortConfig, columns])

  // Pagination calculations
  const totalItems = sortedData.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  const isAllSelected =
    paginatedData.length > 0 &&
    paginatedData.every((row) => selectedIds.includes(row.id))

  const handleSelectAll = () => {
    const pageIds = paginatedData.map((row) => row.id)
    let next: (string | number)[]

    if (isAllSelected) {
      next = selectedIds.filter((id) => !pageIds.includes(id))
    } else {
      next = Array.from(new Set([...selectedIds, ...pageIds]))
    }

    if (onSelectionChange) {
      onSelectionChange(next)
    } else {
      setInternalSelectedIds(next)
    }
  }

  // Export CSV
  const handleExportCSV = () => {
    const headers = columns
      .filter((c) => visibleColumns[c.id])
      .map((c) => c.header)
      .join(',')

    const rows = sortedData.map((row) =>
      columns
        .filter((c) => visibleColumns[c.id])
        .map((c) => {
          const val = c.accessorKey ? row[c.accessorKey] : ''
          return `"${String(val ?? '').replace(/"/g, '""')}"`
        })
        .join(',')
    )

    const csvContent = [headers, ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${(title || 'table_export').toLowerCase().replace(/\s+/g, '_')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={cn('w-full space-y-3 font-sans', className)}>
      {/* ──────────────── Table Header Container ──────────────── */}
      <div
        className={cn(
          'p-4 sm:p-5 rounded-t-xl transition-colors shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4',
          currentHeaderTheme.bg,
          currentHeaderTheme.text
        )}
      >
        <div>
          {title && <h2 className="text-lg sm:text-xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="text-xs opacity-90 mt-0.5">{subtitle}</p>}
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Global Search Bar */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-9 pr-3 py-1.5 bg-white/15 hover:bg-white/20 focus:bg-white focus:text-[#202124] text-white placeholder-white/70 rounded-lg text-xs border border-white/25 focus:outline-none focus:ring-2 focus:ring-white transition-all"
            />
            <Search className="w-4 h-4 absolute left-2.5 top-2 opacity-80 pointer-events-none" />
          </div>

          {/* Column Visibility Toggle */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowColumnPicker(!showColumnPicker)}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs flex items-center gap-1.5 transition-colors"
              title="Toggle Columns"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Columns</span>
            </button>

            {showColumnPicker && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-[#202124] rounded-lg shadow-xl border border-[#DADCE0] p-3 z-30 space-y-2 animate-in fade-in">
                <span className="text-[11px] font-bold uppercase text-[#80868B] block tracking-wider">
                  Visible Columns
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto">
                  {columns.map((col) => (
                    <label key={col.id} className="flex items-center gap-2 text-xs cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={visibleColumns[col.id]}
                        onChange={() =>
                          setVisibleColumns((prev) => ({
                            ...prev,
                            [col.id]: !prev[col.id],
                          }))
                        }
                        className="rounded text-[#1A73E8] focus:ring-0"
                      />
                      <span>{col.header}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Export CSV */}
          <button
            type="button"
            onClick={handleExportCSV}
            className="p-2 rounded-lg bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs flex items-center gap-1.5 transition-colors"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Custom user toolbar actions */}
          {toolbarActions}
        </div>
      </div>

      {/* Bulk Action Bar (when rows are selected) */}
      {selectable && selectedIds.length > 0 && (
        <div className="bg-[#E8F0FE] border border-[#D2E3FC] text-[#1A73E8] px-4 py-2.5 rounded-lg flex items-center justify-between text-xs animate-in fade-in">
          <span className="font-semibold">
            {selectedIds.length} row{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onSelectionChange) onSelectionChange([])
                else setInternalSelectedIds([])
              }}
              className="text-[#1A73E8] hover:underline font-medium"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* ──────────────── Real HTML Data Table ──────────────── */}
      <div className="card-highlighted-table-container">
        <table className="card-highlighted-table">
          {/* Table Head */}
          <thead>
            <tr className="bg-[#F1F3F4] text-[#5F6368] text-xs uppercase tracking-wider">
              {selectable && (
                <th className="w-10 text-center rounded-l-md">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={handleSelectAll}
                    className="rounded text-[#1A73E8] focus:ring-0 cursor-pointer h-4 w-4"
                    aria-label="Select all rows"
                  />
                </th>
              )}

              {columns
                .filter((col) => visibleColumns[col.id])
                .map((col) => {
                  const isSorted = sortConfig?.columnId === col.id
                  return (
                    <th
                      key={col.id}
                      style={{ width: col.width }}
                      className={cn(
                        'text-left select-none',
                        col.align === 'center' && 'text-center',
                        col.align === 'right' && 'text-right',
                        col.sortable && 'cursor-pointer hover:text-[#202124]'
                      )}
                      onClick={() => col.sortable && handleSort(col.id)}
                    >
                      <div
                        className={cn(
                          'inline-flex items-center gap-1.5',
                          col.align === 'center' && 'justify-center',
                          col.align === 'right' && 'justify-end'
                        )}
                      >
                        <span>{col.header}</span>
                        {col.sortable && (
                          <span className="text-[#80868B]">
                            {isSorted ? (
                              sortConfig.direction === 'asc' ? (
                                <ChevronUp className="w-3.5 h-3.5 text-[#1A73E8]" />
                              ) : (
                                <ChevronDown className="w-3.5 h-3.5 text-[#1A73E8]" />
                              )
                            ) : (
                              <ChevronsUpDown className="w-3.5 h-3.5 opacity-40 hover:opacity-100" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                  )
                })}

              {rowActions && <th className="w-16 text-right rounded-r-md">Actions</th>}
            </tr>
          </thead>

          {/* Table Body: Highlighted Card-Style Rows */}
          <tbody>
            {isLoading ? (
              // Loading Skeleton Rows
              Array.from({ length: pageSize }).map((_, rIdx) => (
                <tr key={rIdx} className="card-row animate-pulse">
                  {selectable && <td className="w-10 text-center"><div className="w-4 h-4 bg-[#E0E0E0] rounded mx-auto" /></td>}
                  {columns
                    .filter((c) => visibleColumns[c.id])
                    .map((_, cIdx) => (
                      <td key={cIdx}>
                        <div className="h-4 bg-[#E0E0E0] rounded w-3/4" />
                      </td>
                    ))}
                  {rowActions && <td><div className="w-6 h-4 bg-[#E0E0E0] rounded ml-auto" /></td>}
                </tr>
              ))
            ) : error ? (
              // Error State
              <tr>
                <td
                  colSpan={columns.filter((c) => visibleColumns[c.id]).length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="bg-white rounded-xl border border-[#EA4335] p-8 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <AlertTriangle className="w-8 h-8 text-[#EA4335]" />
                    <p className="text-sm font-semibold text-[#202124]">{error}</p>
                    {onRetry && (
                      <Button size="sm" variant="outline" onClick={onRetry} leftIcon={<RefreshCw className="w-3.5 h-3.5" />}>
                        Retry
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              // Empty State
              <tr>
                <td
                  colSpan={columns.filter((c) => visibleColumns[c.id]).length + (selectable ? 1 : 0) + (rowActions ? 1 : 0)}
                  className="bg-white rounded-xl border border-[#DADCE0] p-10 text-center text-sm text-[#5F6368]"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              // Real Data Rows
              paginatedData.map((row, rIdx) => {
                const isSelected = selectedIds.includes(row.id)
                const indicatorColor = getRowIndicatorColor ? getRowIndicatorColor(row) : 'blue'
                const indicatorClass = rowIndicatorMap[indicatorColor] || rowIndicatorMap.blue

                return (
                  <tr
                    key={row.id}
                    className={cn('card-row', isSelected && 'is-selected')}
                  >
                    {/* Checkbox column with colored vertical indicator bar */}
                    {selectable && (
                      <td className="w-10 text-center">
                        {/* Colored Left Indicator Strip */}
                        <span
                          className={cn('absolute top-0 bottom-0 left-0 w-1 rounded-l-md', indicatorClass)}
                          aria-hidden="true"
                        />
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(row.id)}
                          className="rounded text-[#1A73E8] focus:ring-0 cursor-pointer h-4 w-4"
                          aria-label={`Select row ${row.id}`}
                        />
                      </td>
                    )}

                    {/* Columns */}
                    {columns
                      .filter((col) => visibleColumns[col.id])
                      .map((col, cIdx) => {
                        const cellValue = col.cell
                          ? col.cell(row, rIdx)
                          : col.accessorKey
                          ? String(row[col.accessorKey] ?? '')
                          : null

                        // If not selectable, place the colored strip on first data cell
                        const isFirstCell = !selectable && cIdx === 0

                        return (
                          <td
                            key={col.id}
                            className={cn(
                              'text-xs text-[#202124]',
                              col.align === 'center' && 'text-center',
                              col.align === 'right' && 'text-right'
                            )}
                          >
                            {isFirstCell && (
                              <span
                                className={cn('absolute top-0 bottom-0 left-0 w-1 rounded-l-md', indicatorClass)}
                                aria-hidden="true"
                              />
                            )}
                            {cellValue}
                          </td>
                        )
                      })}

                    {/* Row Contextual Actions */}
                    {rowActions && (
                      <td className="w-16 text-right">
                        {rowActions(row)}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ──────────────── Table Footer & Pagination ──────────────── */}
      {!isLoading && !error && sortedData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3 text-xs text-[#5F6368] border-t border-[#DADCE0]">
          {/* Page Size & Summary */}
          <div className="flex items-center gap-3">
            <span>
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, totalItems)} of {totalItems} items
            </span>

            <div className="flex items-center gap-1.5">
              <span>Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value))
                  setCurrentPage(1)
                }}
                className="bg-white border border-[#DADCE0] rounded px-2 py-1 text-xs text-[#202124] focus:outline-none focus:ring-1 focus:ring-[#1A73E8]"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="h-8 w-8 p-0"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="px-3 font-semibold text-[#202124]">
              {currentPage} / {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="h-8 w-8 p-0"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
