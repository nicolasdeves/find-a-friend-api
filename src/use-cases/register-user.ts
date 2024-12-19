import { UserRepository } from '@/repositories/user-repository';
import { hash } from 'bcryptjs';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({ name, email, password }: RegisterUserUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user };
  }
}
