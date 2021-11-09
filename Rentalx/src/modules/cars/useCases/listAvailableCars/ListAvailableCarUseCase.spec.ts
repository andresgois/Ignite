import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Car", () => {
  beforeEach( () => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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
    const cars = await listAvailableCarsUseCase.execute({});
    
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Gol", 
      description: "Carro de popular", 
      daily_rate: 80.00, 
      license_plate: "ABC-2096", 
      fine_amount: 156, 
      brand: "Volkswagen", 
      category_id: "category_teste2"
    })
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Volkswagen",
    });
    
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Uno", 
      description: "Carro de popular", 
      daily_rate: 50.00, 
      license_plate: "TST-5689", 
      fine_amount: 156, 
      brand: "Fiat", 
      category_id: "Popular"
    })
    const cars = await listAvailableCarsUseCase.execute({
      name: "Fiat Uno",
    });
    
    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Fiat Mobi", 
      description: "Carro de popular", 
      daily_rate: 70.00, 
      license_plate: "HIJ-1110", 
      fine_amount: 80, 
      brand: "Fiat", 
      category_id: "Nacional"
    })
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "Nacional",
    });
    
    expect(cars).toEqual([car]);
  });

});