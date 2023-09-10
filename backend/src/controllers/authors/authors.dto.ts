import { body } from 'express-validator';

export const CreateAuthorDTO = () => {
  return [
    body('firstName').isString().withMessage('firstName should be string'),
    body('lastName').isString().withMessage('lastName should be string')
  ];
};
