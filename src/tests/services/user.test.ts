import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { EmailAlreadyExistsError } from "@/services/errors/email-already-exists-error";
import { RegisterUserService } from "@/services/user.service";
import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";


describe("User service", () => {
    it('sould be able to register', async () =>{
        const userRepository = new InMemoryUserRepository()
        const registerUserService = new RegisterUserService(userRepository)

        await expect(registerUserService.handle({
            name: 'Ciclano',
            email: 'ciclano@gmail.com',
            password: '654321'
        })).resolves.not.toThrow()
    })


    it('sould hash user password upon registrations', async () =>{
        const userRepository = new InMemoryUserRepository()
        const registerUserService = new RegisterUserService(userRepository)

        const { user } = await registerUserService.handle({
            name: 'Fulano',
            email: 'fulano@email.com',
            password: '123456'

        })

        const isPasswordHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordHashed).toBe(true)
    })

    it('sould not able to register with same email twice', async () =>{
        const userRepository = new InMemoryUserRepository()
        const registerUserService = new RegisterUserService(userRepository)

        const email = 'fulano@email.com'

        await registerUserService.handle({
            name: 'Fulano',
            email,
            password: '123456'

        })

        await expect(() => registerUserService.handle({
            name: 'Ciclano',
            email,
            password: '654321'
        })).rejects.toBeInstanceOf(EmailAlreadyExistsError)
    })
})