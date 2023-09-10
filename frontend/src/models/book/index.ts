import { z } from 'zod';

import { authorAttributes } from '@/models/author';

export const bookAttributes = z.object({
  author: authorAttributes,
  authorId: z.string(),
  id: z.string(),
  isbn: z.string(),
  name: z.string(),
});

export type BookZ = z.infer<typeof bookAttributes>;
