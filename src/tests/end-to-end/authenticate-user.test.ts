import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import request from 'supertest';

describe('authenticate user e2e', () => {
  beforeAll(async () => {
    app.ready();
  });

  afterAll(async () => {
    app.close();
  });

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/user').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    });

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toHaveProperty('token');
  });
});
