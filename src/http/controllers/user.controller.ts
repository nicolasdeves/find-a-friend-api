import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists-error';
import { makeRegisterUserService } from '@/services/factories/make-register-user-service';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {

    const registerUserService = makeRegisterUserService()

    await registerUserService.handle({
      name,
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
