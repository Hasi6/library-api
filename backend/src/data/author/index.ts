import { Table, Model, Column, DataType, HasMany, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Book } from '@data/book';

@Table({
  timestamps: false,
  tableName: 'author',
  underscored: true
})
export class Author extends Model {
  @Default(uuidv4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  lastName!: string;

  @HasMany(() => Book)
  books!: Book[];
}
