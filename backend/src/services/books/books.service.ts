import { Author, Book } from '@data/index';
import { Book as IBook } from '@models/book';
import { BadRequestError } from '@utils/execptions';
import logger from '@utils/logger';
import { Query, paginationBuilder } from '@utils/paginationBuilder';

export class BooksService {
  public static async getAll(query: Query) {
    try {
      const books = await Book.findAll({
        limit: query.pageSize,
        offset: query.skip,
        include: Author
      });
      const count = await Book.count();
      return paginationBuilder(books, count, query);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public static async getOne(id: string) {
    try {
      const book = await Book.findByPk(id, { include: Author });
      return book;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async create(body: Omit<IBook, 'id'>) {
    try {
      const book = await Book.create(body, { returning: true });
      return book;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  public static async update(id: string, body: Omit<IBook, 'id'>) {
    try {
      const book = await Book.update(body, { where: { id } });

      if (book[0] > 0) {
        const updatedBook = await Book.findByPk(id);
        return updatedBook;
      }

      throw new BadRequestError('Book not found');
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw err;
    }
  }
}
