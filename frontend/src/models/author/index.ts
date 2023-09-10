import { z } from 'zod';

export const authorAttributes = z.object({
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
});

export type AuthorZ = z.infer<typeof authorAttributes>;
