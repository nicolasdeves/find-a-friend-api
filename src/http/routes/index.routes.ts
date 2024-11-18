import { FastifyInstance } from 'fastify';
import { register } from '../controllers/user.controller';

export async function indexRoutes(app: FastifyInstance) {
  app.post('/user', register);
}
