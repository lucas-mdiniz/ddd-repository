import { InputCreateProductDto } from "./create.product.dto";
import { CreateProductUsecase } from "./create.product.usecase";

const MockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  update: jest.fn(),
});

const productInput: InputCreateProductDto = {
  type: "a",
  name: "product name",
  price: 100,
};

describe("Unit test create product usecase", () => {
  it("should create a product", async () => {
    const mockProductRepository = MockRepository();
    const createProductUseCase = new CreateProductUsecase(
      mockProductRepository
    );

    const result = await createProductUseCase.execute(productInput);

    expect(result).toEqual({
      id: expect.any(String),
      name: productInput.name,
      price: productInput.price,
    });
  });

  it("should throw an error when product type is invalid", async () => {
    productInput.price = -1;

    const mockProductRepository = MockRepository();
    const createProductUseCase = new CreateProductUsecase(
      mockProductRepository
    );

    await expect(createProductUseCase.execute(productInput)).rejects.toThrow(
      "Price must be greater than 0"
    );
  });

  it("should throw an error when product name is empty", async () => {
    productInput.name = "";

    const mockProductRepository = MockRepository();
    const createProductUseCase = new CreateProductUsecase(
      mockProductRepository
    );

    await expect(createProductUseCase.execute(productInput)).rejects.toThrow(
      "Name is required"
    );
  });
});
