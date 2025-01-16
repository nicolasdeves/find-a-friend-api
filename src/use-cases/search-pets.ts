import { FindAllParams } from '@/repositories/interfaces/pet-interface';
import { PetRepository } from '@/repositories/pet-repository';
import { Pet } from '@prisma/client';

interface SearchPetsUseCaseRequest {
  city_id: number;
  org_id?: number;
  age?: number;
}

interface SearchPetsUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsUseCase {
  constructor(private petRepository: PetRepository) {}

  async handle(
    params: SearchPetsUseCaseRequest,
  ): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petRepository.searchPets(params);

    return { pets };
  }
}
