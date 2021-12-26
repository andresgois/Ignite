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
    const car = await carsRepositoryInMemory.create({
      name: 'teste',
      description: 'car teste',
      daily_rate: 100,
      license_plate: 'teste',
      fine_amount: 40,
      category_id: '12334',
      brand: 'brand'
    })

    const rental = await createRentalUseCase.execute({
      user_id: "123456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  })

  it(" Should be able to create a new renral if there is another open to the same user", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "1111",
      expected_return_date: dayAdd24Hours,
      user_id: "123456"
    });
    
    await expect(createRentalUseCase.execute({
        user_id: "123456",
        car_id: "121213",
        expected_return_date: dayAdd24Hours,
      })).rejects.toEqual(new AppError("There's a rental in progress for users!"));
  })

  it(" Should be able to create a new renral if there is another open to the same car", async () => {
    const car = await rentalsRepositoryInMemory.create({
      car_id: "123",
      expected_return_date: dayAdd24Hours,
      user_id: "123456"
    });
    
    await expect(createRentalUseCase.execute({
        user_id: "1234",
        car_id: "123",
        expected_return_date: dayAdd24Hours,
      })).rejects.toEqual(new AppError("Car is unavailable"));
  })

  it("Should not be able to create a new rental with invalid return time", async () => {

    await expect(createRentalUseCase.execute({
        user_id: "9856",
        car_id: "1289636",
        expected_return_date: dayjs().toDate(),
      })).rejects.toEqual(new AppError("Invalid return time!"));
  });

});