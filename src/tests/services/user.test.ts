import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error';
import { RegisterUserUseCase } from '@/use-cases/register-user';
import { compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let userRepository: InMemoryUserRepository;
let registerUser: RegisterUserUseCase;

describe('Register user use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    registerUser = new RegisterUserUseCase(userRepository);
  });

  it('sould be able to register', async () => {
    await expect(
      registerUser.handle({
        name: 'Ciclano',
        email: 'ciclano@gmail.com',
        password: '654321',
      }),
    ).resolves.not.toThrow();
  });

  it('sould hash user password upon registrations', async () => {
    const { user } = await registerUser.handle({
      name: 'Fulano',
      email: 'fulano@email.com',
      password: '123456',
    });

    const isPasswordHashed = await compare('123456', user.password_hash);

    expect(isPasswordHashed).toBe(true);
  });

  it('sould not able to register with same email twice', async () => {
    const email = 'fulano@email.com';

    await registerUser.handle({
      name: 'Fulano',
      email,
      password: '123456',
    });

    await expect(() =>
      registerUser.handle({
        name: 'Ciclano',
        email,
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  });
});
