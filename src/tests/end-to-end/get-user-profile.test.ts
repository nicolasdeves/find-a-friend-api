import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import request from 'supertest';

describe('user profile e2e', () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456',
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get('/profile')
      .set('Authorization', `Bearer ${token}`);

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({ email: 'johndoe@email.com' }),
    );
  });
});
