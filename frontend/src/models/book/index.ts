import { z } from 'zod';

import { authorAttributes } from '@/models/author';

export const bookAttributes = z.object({
  name: z.string(),
  isbn: z.string(),
  authorId: z.string(),
  author: authorAttributes,
});

export type BookZ = z.infer<typeof bookAttributes>;
