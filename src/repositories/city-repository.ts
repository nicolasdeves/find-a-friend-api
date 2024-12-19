import { City, Prisma } from "@prisma/client";

export interface CityRepository {
  create(data: Prisma.CityUncheckedCreateInput): Promise<City>;
}
