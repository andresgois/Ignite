import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {

  constructor(
     private carsRepository: ICarsRepository,
     private specificationsRepository: ISpecificationsRepository
  ){}
  async execute({ car_id, specifications_id }: IRequest): Promise<void>{
    
    const carExixsts = await this.carsRepository.findById(car_id);

    if(!carExixsts){
      throw new AppError("Car does not exists!")
    }
    const specifications = await this.specificationsRepository.findByids(
      specifications_id
    );

    carExixsts.specifications = specifications;

    await this.carsRepository.create(carExixsts);
    console.log(carExixsts);
  }
  
}

export { CreateCarSpecificationUseCase }