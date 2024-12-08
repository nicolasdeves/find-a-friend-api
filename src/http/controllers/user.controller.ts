import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUserService } from '@/services/user.service';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists-error';

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const userRepository = new PrismaUserRepository();
    const registerUserService = new RegisterUserService(userRepository);

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
