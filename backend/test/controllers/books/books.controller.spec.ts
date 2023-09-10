import request from 'supertest';

import app, { server } from '../../../src';
import { sleep } from '../../../src/utils/helpers';

describe('Book Endpoints', () => {
  afterAll(async () => {
    server.close();
    await sleep(200);
  });

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
});
