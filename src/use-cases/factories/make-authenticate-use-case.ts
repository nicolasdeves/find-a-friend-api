import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate";

export function makeAuthenticateSercice() {
    const userRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateUseCase(userRepository);

    return authenticateService
}