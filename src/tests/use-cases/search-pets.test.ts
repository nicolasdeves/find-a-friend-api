import { InMemoryOrgRepository } from '@/repositories/in-memory/in-memory-org-repository';
import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';
import { RegisterPetUseCase } from '@/use-cases/register-pet';
import { SearchPetsUseCase } from '@/use-cases/search-pets';
import { randomInt } from 'crypto';
import { expect, describe, it, beforeEach } from 'vitest';

let petRepository: InMemoryPetRepository;
let orgsRepository: InMemoryOrgRepository;
let searchPets: SearchPetsUseCase;

describe('Pet use case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository(orgsRepository);
    searchPets = new SearchPetsUseCase(petRepository);
  });

  it('should be able to search pets by city', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 1,
      user_id: 1,
    });

    await orgsRepository.create({
      name: 'Org 2',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 2,
      user_id: 2,
    });

    await petRepository.create({
      name: 'Bob',
      age: 5,
      org_id: 1,
    });

    await petRepository.create({
      name: 'Tom',
      age: 5,
      org_id: 2,
    });

    const { pets } = await searchPets.handle({
      city_id: 1,
    });

    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Bob' }));
  });

  it('should be able to search pets by age', async () => {
    await orgsRepository.create({
      name: 'Org 1',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 1,
      user_id: 1,
    });

    await orgsRepository.create({
      name: 'Org 2',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 2,
      user_id: 2,
    });

    await orgsRepository.create({
      name: 'Org 3',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 1,
      user_id: 1,
    });

    await petRepository.create({
      name: 'Bob',
      age: 5,
      org_id: 1,
    });

    await petRepository.create({
      name: 'Tom',
      age: 5,
      org_id: 2,
    });

    await petRepository.create({
      name: 'Ozzy',
      age: 15,
      org_id: 1,
    });

    const { pets } = await searchPets.handle({
      city_id: 1,
      age: 5,
    });

    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Bob' }));
    expect(pets.length).toBe(1);
  });
  it('should be able to search pets by org', async () => {
    await orgsRepository.create({
      id: 1,
      name: 'Org 1',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 1,
      user_id: 1,
    });

    await orgsRepository.create({
      id: 2,
      name: 'Org 2',
      email: 'org@gmail.com',
      phone: '999999999',
      city_id: 1,
      user_id: 2,
    });

    await petRepository.create({
      name: 'Bob',
      age: 5,
      org_id: 1,
    });

    await petRepository.create({
      name: 'Tom',
      age: 5,
      org_id: 2,
    });

    const { pets } = await searchPets.handle({
      city_id: 1,
      org_id: 1,
    });

    expect(pets[0]).toEqual(expect.objectContaining({ name: 'Bob' }));
    expect(pets.length).toBe(1);
  });

  it('should be able to search a pet by id', async () => {
    const id = randomInt(100);

    await petRepository.create({
      id,
      name: 'Bob',
      age: 7,
      org_id: 1,
    });

    const pet = await petRepository.getById(id);

    expect(pet.id).toEqual(id);
    expect(pet).toEqual(
      expect.objectContaining({
        id,
        name: 'Bob',
        age: 7,
        org_id: 1,
      }),
    );
  });
});
