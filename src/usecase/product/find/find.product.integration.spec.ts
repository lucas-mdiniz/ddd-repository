import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import FindProductUsecase from "./find.product.usecase";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import Product from "../../../domain/product/entity/product";

describe("Integration test find product usecase", () => {
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

  fit("should find a product by id", async () => {
    const productRepository = new ProductRepository();

    const productMock = ProductFactory.create("a", "name", 10);

    await productRepository.create(productMock as Product);

    const findProductUseCase = new FindProductUsecase(productRepository);

    const result = await findProductUseCase.execute(productMock.id);

    expect(result).toEqual({
      id: productMock.id,
      name: productMock.name,
      price: productMock.price,
    });
  });
});
