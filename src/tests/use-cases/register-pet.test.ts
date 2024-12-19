import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';
import { RegisterPetUseCase } from '@/use-cases/register-pet';
import exp from 'constants';
import { expect, describe, it, beforeEach } from 'vitest';

let petRepository: InMemoryPetRepository;
let registerPet: RegisterPetUseCase;

describe('Pet use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    registerPet = new RegisterPetUseCase(petRepository);
  });

  it('should be able to register a pet', async () => {
      const { pet } = await registerPet.handle({
        name: 'Bob',
        age: 5,
        org_id: 1
      })
      expect(pet).toEqual(
        expect.objectContaining({ name: 'Bob' })
      )
  });
});
