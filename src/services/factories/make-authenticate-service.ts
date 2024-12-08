import { PrismaUserRepository } from "@/repositories/prisma/prisma-user-repository";
import { AuthenticateService } from "../authenticate.service";

export function makeAuthenticateSercice() {
    const userRepository = new PrismaUserRepository();
    const authenticateService = new AuthenticateService(userRepository);

    return authenticateService
}