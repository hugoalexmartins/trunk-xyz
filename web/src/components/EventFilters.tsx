'use client'

import { useState } from 'react'
import type { EventType, EventStatus } from '@prisma/client'
import { EventType as EventTypeEnum, EventStatus as EventStatusEnum } from '@prisma/client'
import { Button } from './Button'
import { Label } from './Label'
import { Card, CardBody } from './Card'

interface EventFiltersProps {
  onFilterChange: (filters: FilterState) => void
}

export interface FilterState {
  type?: EventType
  status?: EventStatus
  startDate?: Date
  endDate?: Date
  search?: string
}

export function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [type, setType] = useState<EventType | ''>('')
  const [status, setStatus] = useState<EventStatus | ''>('')
  const [search, setSearch] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleFilterChange = () => {
    onFilterChange({
      type: type ? (type as EventType) : undefined,
      status: status ? (status as EventStatus) : undefined,
      search: search || undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    })
  }

  const handleClearFilters = () => {
    setType('')
    setStatus('')
    setSearch('')
    setStartDate('')
    setEndDate('')
    onFilterChange({})
  }

  return (
    <Card className="mb-6">
      <CardBody className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <Label htmlFor="search">Search</Label>
            <input
              id="search"
              type="text"
              placeholder="Title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Type Filter */}
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as EventType | '')}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Types</option>
              {Object.values(EventTypeEnum).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as EventStatus | '')}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Statuses</option>
              {Object.values(EventStatusEnum).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="startDate">From</Label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="endDate">To</Label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end pt-2">
          <Button variant="secondary" onClick={handleClearFilters}>
            Clear Filters
          </Button>
          <Button variant="primary" onClick={handleFilterChange}>
            Apply Filters
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
