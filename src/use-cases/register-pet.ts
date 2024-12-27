import { PetRepository } from '@/repositories/pet-repository';
import { Pet } from '@prisma/client';

interface RegisterPetUseCaseRequest {
  name: string;
  age: number;
  org_id: number;
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(private petRepository: PetRepository) {}

  async handle({
    name,
    age,
    org_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petRepository.create({
      name,
      age,
      org_id,
    });

    return { pet };
  }
}
