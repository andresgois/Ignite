
import "reflect-metadata";
import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";



let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;


describe("Authenticate User", () => {
  
  beforeEach( () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    );
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

  it("should not be able to authenticate an nonexistent user", async() => {
    await expect(
      authenticateUserUseCase.execute({
        email: "fake@email.com",
        password: "1234567"
      })).rejects.toEqual(new AppError("Email or Password incorrect!"));
      
  })

  it("should not be able to authenticate with incorrect password", async() => {
    const user: ICreateUserDTO = {
      driver_license: "9999",
      email: "user2@teste.com",
      name: "user2 teste",
      password: "1234"
    };
    
    await createUserUseCase.execute(user);
    
    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: "passwordIncorrect"
      })).rejects.toEqual(new AppError("Email or Password incorrect!"));
    
  });

});