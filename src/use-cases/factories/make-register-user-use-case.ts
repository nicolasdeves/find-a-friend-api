import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { RegisterUserUseCase } from "../register-user";

export function makeRegisterUserService() {
    const userRepository = new PrismaUserRepository();
    const registerUserService = new RegisterUserUseCase(userRepository);

    return registerUserService
}