import { RegisterUserService } from "@/services/user.service";
import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";


describe("User service", () => {
    it('sould hash user password upon registrations', async () =>{
        const registerUserService = new RegisterUserService({

            //simula o comportamento das funções dentro do service para não haver comunicação com o banco de dados. Tem que ser o mesmo que há na interface do user repository
            async findByEmail() {
                return null
            },

            async create(data) {
                return {
                    id: 1,
                    name: data.name,
                    email: data.email,
                    password_hash: data.password_hash
                }
            }
        })

        const { user } = await registerUserService.handle({
            name: 'Fulano',
            email: 'fulano@email.com',
            password: '123456'

        })

        const isPasswordHashed = await compare(
            '123456',
            user.password_hash
        )

        console.log(user.password_hash)
        console.log(isPasswordHashed)

        expect(isPasswordHashed).toBe(true)
    })
})