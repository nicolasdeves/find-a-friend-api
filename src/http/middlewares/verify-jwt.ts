import { FastifyReply, FastifyRequest } from 'fastify';

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify(); //verifica se o token é valido e o usuario pode ser acessado com request.user.sign.sub (id)
  } catch (error) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}
