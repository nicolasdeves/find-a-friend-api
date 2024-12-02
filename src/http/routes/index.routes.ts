import { FastifyInstance } from 'fastify';
import { register } from '../controllers/user.controller';
import { authenticate } from '../controllers/authenticate.controller';

export async function indexRoutes(app: FastifyInstance) {
  app.post('/user', register);

  app.post('/sessions', authenticate)
}
