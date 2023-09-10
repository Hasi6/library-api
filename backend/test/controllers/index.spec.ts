import request from 'supertest';

import app from '../../src';

let authorId = '';
let bookId = '';

describe('Author Endpoints', () => {
  it('should return all authors', async () => {
    const res = await request(app).get('/api/v1/authors');
    expect(res.statusCode).toEqual(200);
  });

  it('should get 400 when request body is empty when trying to create an author', async () => {
    const res = await request(app).post('/api/v1/authors');
    expect(res.statusCode).toEqual(400);
  });

  it('should get 400 when request body is empty when trying to update an author', async () => {
    const res = await request(app).put('/api/v1/authors/12');
    expect(res.statusCode).toEqual(400);
  });

  it('should create an author', async () => {
    const res = await request(app)
      .post('/api/v1/authors')
      .send({ firstName: `First Name ${Date.now()}`, lastName: `Last Name ${Date.now()}` });
    expect(res.statusCode).toEqual(201);
    authorId = res.body.data.id;
    expect(authorId).toBeDefined();
  });

  it('should update an author', async () => {
    const firstName = `Updated first name ${Date.now()}`;
    const lastName = `Updated last name ${Date.now()}`;

    const res = await request(app).put(`/api/v1/authors/${authorId}`).send({ firstName, lastName });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.firstName).toEqual(firstName);
    expect(res.body.data.lastName).toEqual(lastName);
  });
});

describe('Book Endpoints', () => {
  it('should return all books', async () => {
    const res = await request(app).get('/api/v1/books');
    expect(res.statusCode).toEqual(200);
  });

  it('should get 400 when request body is empty when trying to create a book', async () => {
    const res = await request(app).post('/api/v1/books');
    expect(res.statusCode).toEqual(400);
  });

  it('should get 400 when request body is empty when trying to update a book', async () => {
    const res = await request(app).put('/api/v1/books/12');
    expect(res.statusCode).toEqual(400);
  });

  it('should create new book', async () => {
    const res = await request(app)
      .post('/api/v1/books')
      .send({
        name: `New Book ${Date.now()}`,
        isbn: `New Book ${Date.now()}`,
        authorId
      });
    expect(res.statusCode).toEqual(201);
    bookId = res.body.data.id;
    expect(bookId).toBeDefined();
  });

  it('should update the book', async () => {
    const name = `Updated book name ${Date.now()}`;
    const isbn = `Updated isbn ${Date.now()}`;
    const res = await request(app).put(`/api/v1/books/${bookId}`).send({
      name,
      isbn,
      authorId
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toEqual(name);
    expect(res.body.data.isbn).toEqual(isbn);
  });
});
