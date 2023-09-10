import { z } from 'zod';

export const authorAttributes = z.object({
  firstName: z.string(),
  id: z.string(),
  lastName: z.string(),
});

export type AuthorZ = z.infer<typeof authorAttributes>;

export const authorCreateSchema = z.object({
  firstName: z.string().nonempty({ message: 'First name is required' }),
  lastName: z.string().nonempty({ message: 'Last name is required' }),
});
