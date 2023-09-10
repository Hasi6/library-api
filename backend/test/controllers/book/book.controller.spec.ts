import request from 'supertest';
import app from '../../../src';

describe('Book Endpoints', () => {
  it('should return all books', async () => {
    const res = await request(app).get('/api/v1/books');
    expect(res.statusCode).toEqual(200);
  });
});
