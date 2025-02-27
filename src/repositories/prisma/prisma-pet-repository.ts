import { prisma } from '@/lib/prisma';
import { PetRepository } from '../pet-repository';
import { Prisma } from '@prisma/client';
import { FindAllParams } from '../interfaces/pet-interface';

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });

    return pet;
  }

  async searchPets(params: FindAllParams) {
    let pets = await prisma.pet.findMany({
      where: {
        org: { city_id: params.city_id },
        org_id: params.org_id || undefined,
        age: params.age || undefined
      }
    })

    return pets;
  }

  async getById(id: number){
    const pet = await prisma.pet.findUnique({
      where: {
        id
      }
    })

    return pet;
  }
}
