import { makeRegisterOrgUseCase } from '@/use-cases/factories/make-register-org-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function registerOrg(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerOrgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
    city_id: z.number(),
    user_id: z.number(),
  });

  const { name, email, phone, city_id, user_id } = registerOrgBodySchema.parse(
    request.body,
  );

  try {
    const registerOrgUseCase = makeRegisterOrgUseCase();

    registerOrgUseCase.handle({
      name,
      email,
      phone,
      city_id,
      user_id,
    });

    return reply.status(201).send();
  } catch (error: any) {
    console.error(error.message);
    return reply.status(500).send({ message: error.message });
  }
}
