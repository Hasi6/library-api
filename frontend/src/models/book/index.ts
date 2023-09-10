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

export const bookCreateSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  isbn: z.string().nonempty({ message: 'ISBN is required' }),
  authorId: z.string().nonempty({ message: 'Author is required' }),
});
