import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { GetUserUseCase } from "@/use-cases/get-user";
import { expect, describe, it, beforeEach } from 'vitest';


let userRepository: InMemoryUserRepository;
let getUser: GetUserUseCase;

describe('GetUser use case', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    getUser = new GetUserUseCase (userRepository);
  });

  it('should be able get user', async () => {

    const userCreated = await userRepository.create({
        name: 'Nicolas',
        email: 'nicolas@gmail.com',
        password_hash: '123123123'
    })

    const { user } = await getUser.handle({
        id: userCreated.id
    })

    expect(user).toEqual(expect.objectContaining({ id: userCreated.id }));
    
  });
});
