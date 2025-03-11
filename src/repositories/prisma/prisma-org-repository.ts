import { Prisma, Org } from '@prisma/client';
import { OrgRepository } from '../org-repository';
import { prisma } from '@/lib/prisma';

export class PrismaOrgRepository implements OrgRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data });

    return org;
  }
}
