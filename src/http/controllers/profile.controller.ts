import { makeGetUserUseCase } from '@/use-cases/factories/make-get-user-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUser = makeGetUserUseCase();

  const user = await getUser.handle({
    id: request.user.sign.sub,
  });

  return reply.status(200).send(user);
}
