import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {

  beforeEach( () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it(" Should be able to create a new renral", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: new Date(),
    });

    //console.log(rental);

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it(" Should be able to create a new renral if there is another open to the same user", async () => {
    
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121548",
        expected_return_date: new Date(),
      });
      
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it(" Should be able to create a new renral if there is another open to the same car", async () => {
    
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "9856",
        car_id: "123",
        expected_return_date: new Date(),
      });
      
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  })


})