import ProductFactory from "../../../domain/product/factory/product.factory";
import { UpdateProductUseCase } from "./update.product.usecase";

const product = ProductFactory.create("a", "product name", 100);

const input = {
  id: product.id,
  name: "product updated",
  price: 200,
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(product)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update product use case", () => {
  it("should update product", async () => {
    const productRepository = MockRepository();
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const output = await updateProductUseCase.execute(input);

    expect(output).toEqual(input);
  });

  it("should throw an error if product is not found", async () => {
    const productRepository = MockRepository();
    productRepository.findById = jest
      .fn()
      .mockReturnValue(Promise.resolve(null));
    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    await expect(updateProductUseCase.execute(input)).rejects.toThrow(
      "Product not found"
    );
  });
});
