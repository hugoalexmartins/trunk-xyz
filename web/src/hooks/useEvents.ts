import { useQuery } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import type { EventType, EventStatus } from '@prisma/client';

interface ListEventsFilters {
  type?: EventType;
  status?: EventStatus;
  startDate?: Date;
  endDate?: Date;
  pipelineId?: string;
  search?: string;
  cursor?: string;
  limit?: number;
}

export function useEvents(filters?: ListEventsFilters) {
  return useQuery({
    queryKey: ['events', filters],
    queryFn: async () => {
      return trpc.events.listAll.query({
        type: filters?.type,
        status: filters?.status,
        startDate: filters?.startDate,
        endDate: filters?.endDate,
        pipelineId: filters?.pipelineId,
        search: filters?.search,
        cursor: filters?.cursor,
        limit: filters?.limit || 20,
      });
    },
  });
}

export function useEventsByPipeline(pipelineId: string, limit = 20) {
  return useQuery({
    queryKey: ['events', 'pipeline', pipelineId],
    queryFn: async () => {
      return trpc.events.listByPipeline.query({
        pipelineId,
        limit,
      });
    },
    enabled: !!pipelineId,
  });
}

export function useSingleEvent(id: string) {
  return useQuery({
    queryKey: ['events', id],
    queryFn: async () => {
      return trpc.events.getById.query({ id });
    },
    enabled: !!id,
  });
}

export function useEventCount(pipelineId?: string) {
  return useQuery({
    queryKey: ['events', 'count', pipelineId],
    queryFn: async () => {
      return trpc.events.count.query({ pipelineId });
    },
  });
}
