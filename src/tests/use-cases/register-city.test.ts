

import { InMemoryCityRepository } from '@/repositories/in-memory/in-memory-city-repository';
import { RegisterCityUseCase } from '@/use-cases/register-city';
import { expect, describe, it, beforeEach } from 'vitest';

let cityRepository: InMemoryCityRepository;
let registerCity: RegisterCityUseCase;

describe('City use case', () => {
  beforeEach(() => {
    cityRepository = new InMemoryCityRepository();
    registerCity = new RegisterCityUseCase(cityRepository);
  });

  it('should be able to register a city', async () => {
    
      const { city } = await registerCity.handle({
        name: 'Lajeado',
      })
      expect(city).toEqual(
        expect.objectContaining({ name: 'Lajeado' })
      )
  });
});
