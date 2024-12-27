import { Prisma, Org } from '@prisma/client';
import { OrgRepository } from '../org-repository';

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      id: data.id || this.items.length + 1,
      name: data.name,
      email: data.email,
      phone: data.phone,
      city_id: data.city_id,
      user_id: data.user_id,
    };

    this.items.push(org);

    return org;
  }
}
