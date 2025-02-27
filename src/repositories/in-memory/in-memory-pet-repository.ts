import { Prisma, Pet } from '@prisma/client';
import { PetRepository } from '../pet-repository';
import { FindAllParams } from '../interfaces/pet-interface';
import { InMemoryOrgRepository } from './in-memory-org-repository';

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  constructor(private orgRepository: InMemoryOrgRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id || this.items.length + 1,
      name: data.name,
      age: data.age,
      org_id: data.org_id,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }

  async searchPets(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgRepository.items.filter(
      (org) => org.city_id === params.city_id,
    );

    let pets = this.items.filter((pet) =>
      orgsByCity.find((org) => org.id === pet.org_id),
    );

    if (params.age) {
      pets = pets.filter((pet) => pet.age === params.age);
    }

    if (params.org_id) {
      pets = pets.filter((pet) => pet.org_id === params.org_id);
    }

    return pets;
  }

  async getById(id: number){
    const pet = this.items.filter((pet) => pet.id === id)[0];

    return pet;
  }
}
