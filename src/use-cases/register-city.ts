import { CityRepository } from '@/repositories/city-repository';
import { City } from '@prisma/client';

interface RegisterCityUseCaseRequest {
  name: string;
}

interface RegisterCityUseCaseResponse {
  city: City;
}

export class RegisterCityUseCase {
  constructor(private cityRepository: CityRepository) {}

  async handle({
    name,
  }: RegisterCityUseCaseRequest): Promise<RegisterCityUseCaseResponse> {
    const city = await this.cityRepository.create({
      name,
    });

    return { city };
  }
}
