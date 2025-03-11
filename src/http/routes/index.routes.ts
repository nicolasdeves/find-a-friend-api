import { FastifyInstance } from 'fastify';
import { registerUser } from '../controllers/user.controller';
import { authenticate } from '../controllers/authenticate.controller';
import { profile } from '../controllers/profile.controller';
import { verifyJwt } from '../middlewares/verify-jwt';
import { refreshToken } from '../controllers/refresh-token.controller';
import { registerOrg } from '../controllers/org.controller';

export async function indexRoutes(app: FastifyInstance) {
  app.post('/user', { onRequest: [verifyJwt] }, registerUser);
  app.post('/sessions', authenticate);

  app.patch('/token/refresh', refreshToken);

  app.get('/profile', { onRequest: [verifyJwt] }, profile);

  app.post('/org', { onRequest: [verifyJwt] }, registerOrg);
}
