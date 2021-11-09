import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListCarsUseCase } from "./ListCarsUseCase"


let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {
  beforeEach( () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  })

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Onix LT", 
      description: "Carro de luxo", 
      daily_rate: 98.00, 
      license_plate: "HIJ-8596", 
      fine_amount: 160, 
      brand: "Chevrolet", 
      category_id: "category_teste1"
    })
    const cars = await listCarsUseCase.execute({});
    
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol", 
      description: "Carro de popular", 
      daily_rate: 80.00, 
      license_plate: "ABC-2096", 
      fine_amount: 156, 
      brand: "Volkswagen", 
      category_id: "category_teste2"
    })
    const cars = await listCarsUseCase.execute({
      brand: "Volkswagen",
    });
    
    expect(cars).toEqual([car]);
  });

});