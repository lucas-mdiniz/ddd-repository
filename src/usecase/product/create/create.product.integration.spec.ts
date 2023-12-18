import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "./create.product.dto";
import { CreateProductUsecase } from "./create.product.usecase";

const productInput: InputCreateProductDto = {
  type: "a",
  name: "product name",
  price: 100,
};

describe("Integration test create product usecase", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUseCase = new CreateProductUsecase(productRepository);

    const result = await createProductUseCase.execute(productInput);

    expect(result).toEqual({
      id: expect.any(String),
      name: productInput.name,
      price: productInput.price,
    });
  });
});
