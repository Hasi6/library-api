import { Author } from '@models/author';

export interface Book {
  author?: Author;
  id: string;
  isbn: string;
  name: string;
}
