import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { GetUserUseCase } from "../get-user";


export function makeGetUserUseCase() {
  const userRepository = new PrismaUserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  return getUserUseCase;
}
