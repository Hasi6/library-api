import {
  Table,
  Model,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
  Default,
  PrimaryKey
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

import { Author } from '@data/author';

@Table({
  timestamps: false,
  tableName: 'book',
  underscored: true
})
export class Book extends Model {
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
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  isbn!: string;

  @ForeignKey(() => Author)
  @Column
  authorId!: string;

  @BelongsTo(() => Author)
  author!: Author;
}
