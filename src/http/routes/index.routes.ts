import { FastifyInstance } from 'fastify';
import { register } from '../controllers/user.controller';
import { authenticate } from '../controllers/authenticate.controller';
import { profile } from '../controllers/profile.controller';
import { verifyJwt } from '../middlewares/verify-jwt';
import { refreshToken } from '../controllers/refresh-token.controller';

export async function indexRoutes(app: FastifyInstance) {
  app.post('/user', { onRequest: [verifyJwt] }, register);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refreshToken);

  app.get('/profile', { onRequest: [verifyJwt] }, profile);
}
