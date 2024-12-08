import { FastifyRequest, FastifyReply } from 'fastify';
import { z } from 'zod';
import { RegisterUserService } from '@/services/user.service';
import { PrismaUserRepository } from '@/repositories/prisma/prisma-user-repository';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists-error';
import { AuthenticateService } from '@/services/authenticate.service';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';

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
    const userRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateService(userRepository);

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
