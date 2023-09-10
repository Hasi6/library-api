import request from 'supertest';

import app, { server } from '../../../src';
import { sleep } from '../../../src/utils/helpers';

let authorId = '';

describe('Author Endpoints', () => {
  afterAll(async () => {
    server.close();
    await sleep(500);
  });

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
