import { FastifyInstance } from 'fastify';
import { register } from '../controllers/user.controller';
import { authenticate } from '../controllers/authenticate.controller';
import { profile } from '../controllers/profile.controller';
import { verifyJwt } from '../middlewares/verify-jwt';

export async function indexRoutes(app: FastifyInstance) {
  app.post('/user', register);
  app.post('/sessions', authenticate);

  app.get('/profile', { onRequest: [verifyJwt] }, profile);
}
