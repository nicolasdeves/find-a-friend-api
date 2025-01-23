import { FastifyRequest, FastifyReply } from 'fastify';

export async function refreshToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  await request.jwtVerify({ onlyCookie: true });

  const token = await reply.jwtSign({
    sign: {
      sub: request.user.sign.sub,
      role: request.user.sign.role,
    },
  });

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: request.user.sign.sub,
      role: request.user.sign.role,
      expiresIn: '7d',
    },
  });

  return reply
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      httpOnly: true,
      sameSite: true,
      secure: true,
    })
    .send({
      token,
    });
}
