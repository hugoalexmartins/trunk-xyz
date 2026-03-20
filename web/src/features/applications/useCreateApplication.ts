import { useState } from 'react';
import { trpc } from '@/utils/trpc';
import type { ApplicationFormValues } from './applicationSchema';

export function useCreateApplication() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (values: ApplicationFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await trpc.applications.create.mutate({
        position: values.position,
        company: values.company,
        jobUrl: values.jobUrl || undefined,
        jobUrlFile: values.jobUrlFile || undefined,
        date: values.date,
      });
      return result;
    } catch (err: any) {
      const message = err?.message || 'Failed to create application';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error };
}
