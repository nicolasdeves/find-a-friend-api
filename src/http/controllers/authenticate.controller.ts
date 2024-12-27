import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';
import { makeAuthenticateSercice } from '@/use-cases/factories/make-authenticate-use-case';

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
    const authenticateService = makeAuthenticateSercice();

    const { user } = await authenticateService.handle({
      email,
      password,
    });

    const token = await reply.jwtSign({
      sign: {
        sub: user.id,
      },
    });

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      throw new InvalidCredentialsError();
    }

    throw error;
  }
}
