import { Application } from 'express';

import { AuthorsController } from '@controllers/authors/authors.controller';
import { BooksController } from '@controllers/books/books.controller';

export default function registerRoutes(app: Application): void {
  new AuthorsController(app);
  new BooksController(app);
}
