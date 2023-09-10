import { Author } from '@data/index';
import { Author as IAuthor } from '@models/author';
import { BadRequestError } from '@utils/execptions';
import logger from '@utils/logger';
import { Query, paginationBuilder } from '@utils/paginationBuilder';

export class AuthorsService {
  public static async getAll(query: Query) {
    try {
      const authors = await Author.findAll({
        limit: query.pageSize,
        offset: query.skip
      });
      const count = await Author.count();
      return paginationBuilder(authors, count, query);
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  public static async getOne(id: string) {
    try {
      const author = await Author.findByPk(id);
      return author;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  public static async create(body: Omit<IAuthor, 'id'>) {
    try {
      await Author.create(body);
      return { success: true };
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  public static async update(id: string, body: Omit<IAuthor, 'id'>) {
    try {
      const author = await Author.update(body, { where: { id } });
      if (author[0] > 0) {
        return { success: true };
      }

      throw new BadRequestError('Author not found');
    } catch (err) {
      console.log(err);
      logger.error(err);
      throw err;
    }
  }
}
