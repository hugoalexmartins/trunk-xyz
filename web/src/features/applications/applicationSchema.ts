import { z } from 'zod';

const today = new Date().toISOString().split('T')[0];

export const applicationSchema = z.object({
  position: z.string().min(1, 'Position is required'),
  company: z.string().min(1, 'Company is required'),
  jobUrl: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  jobUrlFile: z.string().optional(),
  date: z.string().min(1, 'Date is required').default(today),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;
