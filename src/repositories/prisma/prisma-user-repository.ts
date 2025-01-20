import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { UserRepository } from '../user-repository';

export class PrismaUserRepository implements UserRepository {
  async create(data: Prisma.UserCreateInput) {
    // o prisma cria a interface automaticamente para cada tabela do banco
    const user = prisma.user.create({ data });

    return user;
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: number) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}
