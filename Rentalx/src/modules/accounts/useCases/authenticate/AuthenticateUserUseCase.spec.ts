
import "reflect-metadata";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory'
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AppError } from "../../../../errors/AppError";


let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {
  
  beforeEach( () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000123",
      email: "user@teste.com",
      name: "user teste",
      password: "123456"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");

  })

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "andre@email.com",
        password: "1234567"
      });
    }).rejects.toBeInstanceOf(AppError);
    
  })

  it("should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "9999",
        email: "user2@teste.com",
        name: "user2 teste",
        password: "1234"
      };
  
      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "passwordIncorrect"
      });
    }).rejects.toBeInstanceOf(AppError);
    
  });

});