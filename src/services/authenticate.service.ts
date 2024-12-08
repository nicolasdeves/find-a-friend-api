import { UserRepository } from '@/repositories/user-repository';
import { User } from '@prisma/client';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';
import { compare } from 'bcryptjs';

interface AuthenticateServiceRequest {
  email: string;
  password: string;
}

interface AuthenticateServiceResponse {
  user: User;
}

export class AuthenticateService {
  constructor(private userRepository: UserRepository) {}

  async handle({
    email,
    password,
  }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
    console.log('email', email);
    console.log('password', password);

    const user = await this.userRepository.findByEmail(email);

    console.log('user', user);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    console.log('doesPasswordMatches', doesPasswordMatches);

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError();
    }

    return { user };
  }
}
