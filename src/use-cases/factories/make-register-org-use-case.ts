import { RegisterOrgUseCase } from '../register-org';
import { PrismaOrgRepository } from '@/repositories/prisma/prisma-org-repository';

export function makeRegisterOrgUseCase() {
  const orgRepository = new PrismaOrgRepository();
  const registerOrgUseCase = new RegisterOrgUseCase(orgRepository);

  return registerOrgUseCase;
}
