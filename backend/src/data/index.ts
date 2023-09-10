import { Sequelize } from 'sequelize-typescript';

import { Book } from '@data/book';
import { Author } from '@data/author';

const connection = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
  models: [Book, Author]
});

export default connection;
export { Book, Author };
