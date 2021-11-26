import { AppError } from "@shared/errors/AppError";
import { Rental } from "../infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../repositories/IRentalsRepository";


interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ){}

  async execute({ car_id, user_id, expected_return_date}: IRequest): Promise<Rental> {

    // O aluguel deve ter duração mínima de  24 horas
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if(carUnavailable){
      throw new AppError("Car is unavailable");
    }
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if(rentalOpenToUser){
      throw new AppError("There's a rental in progress for users!");
    }
    // Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;

  }

}

export { CreateRentalUseCase }