import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import request from 'supertest';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

describe('register user e2e', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to register a user', async () => {
    const password_hash = await bcrypt.hash('123123', 6);

    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@email.com',
        password_hash,
      },
    });

    const token = await request(app.server).post('/sessions').send({
      email: 'admin@email.com',
      password: '123123',
    });

    const responseRegister = await request(app.server)
      .post('/user')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      });

    expect(responseRegister.statusCode).toEqual(201);
  });
});
