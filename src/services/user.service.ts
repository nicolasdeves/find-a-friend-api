import { UserRepository } from '@/repositories/user-repository';
import { hash } from 'bcryptjs';
import { EmailAlreadyExistsError } from './errors/email-already-exists-error';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserService {
  constructor(private userRepository: UserRepository) {}

  async handle({ name, email, password }: RegisterUserRequest) {
    const password_hash = await hash(password, 1);

    const userWithSameEmail = await this.userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.userRepository.create({
      name,
      email,
      password_hash,
    });

    return { user }
  }
}
