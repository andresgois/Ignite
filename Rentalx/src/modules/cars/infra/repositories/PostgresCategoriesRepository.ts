
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository{

  async findByName(name: string): Promise<Category> {
    //throw new Error("Method not implemented.");
    console.log(name);
    return null;
  }
  async list(): Promise<Category[]> {
    //throw new Error("Method not implemented.");
    return null;
  }
  async create({ name, description} : ICreateCategoryDTO): Promise<void> {
    //throw new Error("Method not implemented.");
    console.log(name, description);
    return null;
  }

}

export { PostgresCategoriesRepository };