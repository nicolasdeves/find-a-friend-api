import { City, Prisma } from '@prisma/client';
import { CityRepository } from '../city-repository';

export class InMemoryCityRepository implements CityRepository {
  public items: City[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<City> {
    const city = {
      id: 1,
      name: data.name,
    };

    this.items.push(city);

    return city;
  }
}
