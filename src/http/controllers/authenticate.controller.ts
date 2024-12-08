import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { makeAuthenticateSercice } from '@/services/factories/make-authenticate-service';

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = registerBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateSercice()

    await authenticateService.handle({
      email,
      password,
    });

    return reply.status(200).send();
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
