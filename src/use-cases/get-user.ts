import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";

interface GetUserUseCaseRequest {
  id: number;
}

interface GetUserUseCaseResponse {
  user: User | null;
}

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async handle({
    id
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(id);

    return { user };
  }
}
