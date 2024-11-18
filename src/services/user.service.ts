import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserRequest) {
  const password_hash = await hash(password, 1);

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error('Email already exists!');
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  });
}
