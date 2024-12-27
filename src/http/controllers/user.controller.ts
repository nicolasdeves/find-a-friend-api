import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error';
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerUser = makeRegisterUserUseCase();

    await registerUser.handle({
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
