import { z } from 'zod';

export const authorAttributes = z.object({
  name: z.string(),
  isbn: z.string(),
});

export type AuthorZ = z.infer<typeof authorAttributes>;
