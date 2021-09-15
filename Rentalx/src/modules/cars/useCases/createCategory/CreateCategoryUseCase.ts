import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

/**
 * [] Definir tipo de retorno
 * [] ALterar o retorno de erro
 * [] Acessar o repositorio
 */

class CreateCategoryUseCase {

  // Princípio da inversão de dependência
  constructor(private categoriesRepository : ICategoriesRepository){}

  execute({ name, description }: IRequest): void {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if(categoryAlreadyExists){
      throw new Error("Category Already Exists!");
    }
  
    this.categoriesRepository.create({ name, description});
  }
  
}

export { CreateCategoryUseCase }