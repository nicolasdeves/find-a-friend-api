import { Prisma, Pet } from '@prisma/client';
import { PetRepository } from '../pet-repository';

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: 1,
      name: data.name,
      age: data.age,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
