import { useMutation, useQueryClient } from '@tanstack/react-query';
import { trpc } from '@/utils/trpc';
import type { EventType, EventStatus } from '@prisma/client';

interface CreateEventInput {
  type: EventType;
  title: string;
  description?: string;
  pipelineId?: string;
  status?: EventStatus;
  metadata?: Record<string, unknown>;
}

interface UpdateEventInput {
  id: string;
  type?: EventType;
  title?: string;
  description?: string;
  pipelineId?: string;
  status?: EventStatus;
  metadata?: Record<string, unknown>;
}

export function useCreateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateEventInput) => {
      return trpc.events.create.mutate(input);
    },
    onSuccess: () => {
      // Invalidate events queries to refetch
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useUpdateEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdateEventInput) => {
      return trpc.events.update.mutate(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      return trpc.events.delete.mutate({ id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
  });
}
