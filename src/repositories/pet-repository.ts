import { Prisma, Pet } from '@prisma/client';
import { FindAllParams } from './interfaces/pet-interface';

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  searchPets(params: FindAllParams): Promise<Pet[]>;
}
