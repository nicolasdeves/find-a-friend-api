import fastify from 'fastify';
import { indexRoutes } from './http/routes/index.routes';
import { ZodError } from 'zod';
import { error } from 'console';
import { env } from './env';

export const app = fastify();

app.register(indexRoutes);

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply
            .status(400)
            .send({ message: 'Validation Error.', issues: error.format() })
    }

    if (env.NODE_ENV !== 'production') {
        console.error(error.message)
    }
    return reply.status(500).send({ message: error.message })
})
