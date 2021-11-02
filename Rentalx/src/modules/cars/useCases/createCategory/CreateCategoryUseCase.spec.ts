import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";


let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category teste",
      description: "Category description teste"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  });

  /*it("should not be able to create a new category with name exists", async () => {
    const category = {
      name: "Category teste",
      description: "Category description teste"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty("id");
  });*/

  it("should not be able to create a new category with name exists", async () => {
    expect(async() => {
    const category = {
      name: "Category teste",
      description: "Category description teste"
    };

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    });
    }).rejects.toBeInstanceOf(AppError);

  });


});



/*describe("Create category", () => {

  it("Expect 2 + 2 = 4", () => {
    const sum = 2 + 2;
    const result = 4;

    expect(sum).toBe(result)
  });

  it("Espero que 2 + 2 não seja 5", () => {
    const sum = 2 + 2;
    const result = 5;

    expect(sum).not.toBe(result)
  });

});*/