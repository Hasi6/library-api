export const API_URL_V1 = import.meta.env.VITE_API_URL_V1;

export enum HTTP_TYPES {
  'GET' = 'get',
  'POST' = 'post',
  'PUT' = 'put',
  'DELETE' = 'delete',
  'PATCH' = 'patch',
}

export enum ROUTES {
  HOME = '/',
  BOOKS = '/books',
  AUTHROS = '/authors',
  AUTHOR_DETAILS = '/authors/:id',
  BOOK_DETAILS = '/books/:id',
}

export const API_ROUTES = {
  AUTHORS: {
    BASE: '/authors',
  },
  BOOKS: {
    BASE: '/books',
  },
};

export const MESSGAES = {
  SOME_THING_WENT_WRONG: 'Oops, something went wrong.',
  OPERATION_SUCCESS: 'Operation success.',
};
