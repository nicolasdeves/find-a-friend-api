import fastify from 'fastify';
import { indexRoutes } from './http/routes/index.routes';

export const app = fastify();

app.register(indexRoutes);
