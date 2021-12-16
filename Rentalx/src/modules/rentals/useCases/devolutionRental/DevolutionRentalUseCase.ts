import { inject, injectable } from "tsyringe";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ){}

  async execute({ id, user_id}: IRequest): Promise<Rental>{
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    console.log(car)
    const minimum_daily = 1;

    if(!rental){
      throw new AppError("Rental does not exists!");
    }

    // Verificar o tempo de aluguel
    const dateNow = this.dateProvider.dateNow();
    // quantas diárias o aluguel tem
    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow()
    );

    if(daily <= 0){
      daily = minimum_daily;
    }
    // quantidade de atraso
    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date
    );

    let total = 0.0;

    if(delay > 0){
      const calculate_fine = delay * car.fine_amount;
      console.log(typeof calculate_fine)
      console.log(calculate_fine)
      total = calculate_fine;
    }
    console.log(typeof daily)
      console.log(daily)

      console.log(typeof car.daily_rate)
      console.log(car.daily_rate)
    //car.daily_rate = parseInt(car.daily_rate);
    total += daily + car.daily_rate;
    console.log('Total1 = '+total)

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;
    console.log('Total2 = '+total)
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }


}

export { DevolutionRentalUseCase }