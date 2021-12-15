import dayjs from 'dayjs';
import { AppError } from "@shared/errors/AppError";
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach( () => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
      );
  });

  it(" Should be able to create a new renral", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: "121212",
      expected_return_date: dayAdd24Hours,
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
        expected_return_date: dayAdd24Hours,
      });
      
      await createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121212",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it(" Should be able to create a new renral if there is another open to the same car", async () => {
    
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "9856",
        car_id: "123",
        expected_return_date: dayAdd24Hours,
      });
      
      await createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayAdd24Hours,
      });
    }).rejects.toBeInstanceOf(AppError);
  })

  it(" Should be able to create a new renral with invalid return time", async () => {
    
    expect( async () => {
      await createRentalUseCase.execute({
        user_id: "9856",
        car_id: "123",
        expected_return_date: dayjs().toDate(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

});