import { InMemoryUserRepository } from '@/repositories/in-memory/in-memory-user-repository';
import { AuthenticateService } from '@/services/authenticate.service';
import { EmailAlreadyExistsError } from '@/services/errors/email-already-exists-error';
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error';
import { RegisterUserService } from '@/services/user.service';
import { hash, compare } from 'bcryptjs';
import { expect, describe, it, beforeEach } from 'vitest';

let userRepository: InMemoryUserRepository;
let authenticateService: AuthenticateService;

describe('Authenticate service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authenticateService = new AuthenticateService(userRepository);
  });

  it('should be able to authenticate', async () => {
    await userRepository.create({
      name: 'Ciclano',
      email: 'ciclaninho@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const user = authenticateService.handle({
      email: 'ciclaninho@gmail.com',
      password: '123456',
    });

    await expect(user).resolves.not.toThrow();
  });

  it('should not be able to authenticate with non-existent email', async () => {
    const user = authenticateService.handle({
      email: 'ciclaninho@gmail.com',
      password: '1234561',
    });

    await expect(user).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should not be able to authenticate with invalid password', async () => {
    await userRepository.create({
      name: 'Ciclano',
      email: 'ciclaninho@gmail.com',
      password_hash: await hash('123456', 6),
    });

    const user = authenticateService.handle({
      email: 'ciclaninho@gmail.com',
      password: '654321',
    });

    await expect(user).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
