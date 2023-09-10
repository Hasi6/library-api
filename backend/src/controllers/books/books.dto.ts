import { body } from 'express-validator';

export const CreateBookDTO = () => {
  return [
    body('name').isString().withMessage('name should be string'),
    body('isbn').isString().withMessage('isbn should be string'),
    body('authorId').isString().withMessage('authorId should be valid id')
  ];
};
