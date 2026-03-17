import React, { useState, useMemo, useCallback } from 'react'

const C = {
  canvas: '#F5F9FC',
  ink: '#0B1929',
  primary: '#00D9FF',
  secondary: '#FFB81C',
  faint: '#8B99A6',
  muted: '#4A5A6A',
  lighter: '#E8F1F7',
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortDir = 'asc' | 'desc' | null

export interface DataGridColumn<T> {
  key: keyof T & string
  label: string
  width?: number | string
  sortable?: boolean
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export interface DataGridProps<T extends { id: string | number }> {
  columns: DataGridColumn<T>[]
  rows: T[]
  pageSize?: number
  selectable?: boolean
  searchable?: boolean
  emptyMessage?: string
}

// ─── Sort icon ────────────────────────────────────────────────────────────────

function SortIcon({ dir }: { dir: SortDir }) {
  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', marginLeft: 6, gap: 1, verticalAlign: 'middle' }}>
      <span style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderBottom: dir === 'asc' ? `5px solid ${C.ink}` : `5px solid ${C.faint}` }} />
      <span style={{ width: 0, height: 0, borderLeft: '4px solid transparent', borderRight: '4px solid transparent', borderTop: dir === 'desc' ? `5px solid ${C.ink}` : `5px solid ${C.faint}` }} />
    </span>
  )
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────

function Checkbox({ checked, indeterminate, onChange, label }: { checked: boolean; indeterminate?: boolean; onChange: () => void; label?: string }) {
  const ref = React.useRef<HTMLInputElement>(null)
  React.useEffect(() => {
    if (ref.current) ref.current.indeterminate = !!indeterminate
  }, [indeterminate])
  return (
    <input
      ref={ref}
      type="checkbox"
      aria-label={label}
      checked={checked}
      onChange={onChange}
      style={{
        width: 16,
        height: 16,
        border: `3px solid ${C.ink}`,
        accentColor: C.primary,
        cursor: 'pointer',
      }}
    />
  )
}

// ─── DataGrid ─────────────────────────────────────────────────────────────────

export function DataGrid<T extends { id: string | number }>({
  columns,
  rows,
  pageSize = 5,
  selectable = true,
  searchable = true,
  emptyMessage = 'No data to display.',
}: DataGridProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>(null)
  const [selected, setSelected] = useState<Set<string | number>>(new Set())
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  // ── Search ────────────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    if (!search.trim()) return rows
    const q = search.toLowerCase()
    return rows.filter(row =>
      columns.some(col => {
        const val = row[col.key]
        return val != null && String(val).toLowerCase().includes(q)
      })
    )
  }, [rows, search, columns])

  // ── Sort ──────────────────────────────────────────────────────────────────
  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey as keyof T]
      const bv = b[sortKey as keyof T]
      const aStr = av == null ? '' : String(av)
      const bStr = bv == null ? '' : String(bv)
      const cmp = aStr.localeCompare(bStr, undefined, { numeric: true })
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const safePage = Math.min(page, totalPages - 1)
  const paged = sorted.slice(safePage * pageSize, safePage * pageSize + pageSize)

  const handleSort = useCallback((key: string) => {
    setSortKey(prev => {
      if (prev !== key) { setSortDir('asc'); return key }
      setSortDir(d => d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc')
      return key
    })
    setPage(0)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setPage(0)
  }

  // ── Selection ────────────────────────────────────────────────────────────
  const allPageIds = paged.map(r => r.id)
  const allPageSelected = allPageIds.length > 0 && allPageIds.every(id => selected.has(id))
  const somePageSelected = allPageIds.some(id => selected.has(id)) && !allPageSelected

  const toggleRow = (id: string | number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id) } else { next.add(id) }
      return next
    })
  }

  const toggleAll = () => {
    setSelected(prev => {
      const next = new Set(prev)
      if (allPageSelected) {
        allPageIds.forEach(id => next.delete(id))
      } else {
        allPageIds.forEach(id => next.add(id))
      }
      return next
    })
  }

  const selectedCount = selected.size

  return (
    <div style={{ fontFamily: '"Space Grotesk", system-ui, sans-serif', border: `4px solid ${C.ink}`, boxShadow: `6px 6px 0 ${C.ink}` }}>

      {/* Toolbar */}
      {(searchable || selectedCount > 0) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          padding: '12px 16px',
          borderBottom: `4px solid ${C.ink}`,
          background: selectedCount > 0 ? C.primary : C.canvas,
          flexWrap: 'wrap',
        }}>
          {selectedCount > 0 ? (
            <span style={{ fontWeight: 700, fontSize: 14, color: C.ink }}>
              {selectedCount} row{selectedCount !== 1 ? 's' : ''} selected
            </span>
          ) : (
            searchable && (
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={handleSearch}
                style={{
                  height: 36,
                  padding: '0 12px',
                  border: `3px solid ${C.ink}`,
                  background: C.canvas,
                  fontSize: 13,
                  fontWeight: 600,
                  color: C.ink,
                  fontFamily: '"Space Grotesk", system-ui, sans-serif',
                  outline: 'none',
                  minWidth: 200,
                }}
              />
            )
          )}
          <span style={{ fontSize: 12, fontWeight: 600, color: C.muted }}>
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
          <thead>
            <tr style={{ background: C.ink }}>
              {selectable && (
                <th style={{ width: 40, padding: '12px 16px', textAlign: 'center', borderRight: `2px solid rgba(245,249,252,0.15)` }}>
                  <Checkbox
                    checked={allPageSelected}
                    indeterminate={somePageSelected}
                    onChange={toggleAll}
                    label="Select all"
                  />
                </th>
              )}
              {columns.map((col, i) => (
                <th
                  key={col.key}
                  onClick={col.sortable !== false ? () => handleSort(col.key) : undefined}
                  style={{
                    padding: '12px 16px',
                    textAlign: 'left',
                    fontSize: 11,
                    fontWeight: 800,
                    color: C.canvas,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    userSelect: 'none',
                    width: col.width,
                    borderRight: i < columns.length - 1 ? `2px solid rgba(245,249,252,0.15)` : undefined,
                  }}
                >
                  {col.label}
                  {col.sortable !== false && (
                    <SortIcon dir={sortKey === col.key ? sortDir : null} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  style={{ padding: '32px 16px', textAlign: 'center', fontSize: 14, fontWeight: 600, color: C.faint }}
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paged.map((row, rowIdx) => {
                const isSelected = selected.has(row.id)
                return (
                  <tr
                    key={row.id}
                    style={{
                      background: isSelected ? '#E0F7FF' : rowIdx % 2 === 0 ? C.canvas : C.lighter,
                      borderBottom: `2px solid ${C.ink}`,
                      transition: 'background 0.1s',
                    }}
                  >
                    {selectable && (
                      <td style={{ padding: '12px 16px', textAlign: 'center', borderRight: `2px solid ${C.lighter}` }}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => toggleRow(row.id)}
                          label={`Select row ${row.id}`}
                        />
                      </td>
                    )}
                    {columns.map((col, i) => (
                      <td
                        key={col.key}
                        style={{
                          padding: '12px 16px',
                          fontSize: 14,
                          fontWeight: 600,
                          color: C.ink,
                          borderRight: i < columns.length - 1 ? `2px solid ${C.lighter}` : undefined,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {col.render ? col.render(row[col.key], row) : String(row[col.key] ?? '')}
                      </td>
                    ))}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 16px',
          borderTop: `4px solid ${C.ink}`,
          background: C.canvas,
          flexWrap: 'wrap',
          gap: 8,
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.muted }}>
            Page {safePage + 1} of {totalPages} &nbsp;·&nbsp; {sorted.length} total
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={safePage === 0}
              style={{
                height: 34,
                padding: '0 14px',
                border: `3px solid ${C.ink}`,
                background: safePage === 0 ? C.lighter : C.canvas,
                fontWeight: 700,
                fontSize: 13,
                color: safePage === 0 ? C.faint : C.ink,
                cursor: safePage === 0 ? 'not-allowed' : 'pointer',
                boxShadow: safePage === 0 ? 'none' : `3px 3px 0 ${C.ink}`,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                transition: 'box-shadow 0.1s',
              }}
            >
              ← Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={safePage >= totalPages - 1}
              style={{
                height: 34,
                padding: '0 14px',
                border: `3px solid ${C.ink}`,
                background: safePage >= totalPages - 1 ? C.lighter : C.canvas,
                fontWeight: 700,
                fontSize: 13,
                color: safePage >= totalPages - 1 ? C.faint : C.ink,
                cursor: safePage >= totalPages - 1 ? 'not-allowed' : 'pointer',
                boxShadow: safePage >= totalPages - 1 ? 'none' : `3px 3px 0 ${C.ink}`,
                fontFamily: '"Space Grotesk", system-ui, sans-serif',
                transition: 'box-shadow 0.1s',
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataGrid
