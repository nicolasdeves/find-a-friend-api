import { prisma } from "@/lib/prisma";
import { PetRepository } from "../pet-repository";
import { Prisma } from "@prisma/client";

export class PrismaPetRepository implements PetRepository {
    async create(data: Prisma.PetUncheckedCreateInput) {
        const pet = prisma.pet.create({ data });
    
        return pet;
    }
}