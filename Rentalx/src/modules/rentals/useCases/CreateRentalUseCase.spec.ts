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
    await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: new Date(),
    });
  })


})