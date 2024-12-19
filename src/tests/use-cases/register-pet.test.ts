import { InMemoryPetRepository } from '@/repositories/in-memory/in-memory-pet-repository';
import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error';
import { RegisterPetUseCase } from '@/use-cases/register-pet';
import { RegisterUserUseCase } from '@/use-cases/register-user';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let petRepository: InMemoryPetRepository;
let registerPet: RegisterPetUseCase;

describe('Pet use case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    registerPet = new RegisterPetUseCase(petRepository);
  });

  it('should be able to register a pet', async () => {
    await expect(
      registerPet.handle({
        name: 'Bob',
        age: 5,
        org_id: 1
      }),
    ).resolves.not.toThrow();
  });


  // it('sould not able to register with same email twice', async () => {
  //   const email = 'fulano@email.com';

  //   await registerUser.handle({
  //     name: 'Fulano',
  //     email,
  //     password: '123456',
  //   });

  //   await expect(() =>
  //     registerUser.handle({
  //       name: 'Ciclano',
  //       email,
  //       password: '654321',
  //     }),
  //   ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  // });
});
