import { OrgRepository } from '@/repositories/org-repository';
import { Org } from '@prisma/client';
import { number } from 'zod';

interface RegisterOrgUseCaseRequest {
  name: string;
  email: string;
  phone: string;
  city_id: number;
  user_id: number;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async handle({
    name,
    email,
    phone,
    city_id,
    user_id,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const org = await this.orgRepository.create({
      name,
      email,
      phone,
      city_id,
      user_id,
    });

    return { org };
  }
}
