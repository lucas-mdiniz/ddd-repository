import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "../create/create.product.dto";
import FindProductUsecase from "./find.product.usecase";

const productMock: OutputCreateProductDto = {
  id: "1",
  name: "product name",
  price: 100,
};

const MockRepository = () => ({
  create: jest.fn(),
  findById: jest.fn().mockResolvedValue(productMock),
  findAll: jest.fn(),
  update: jest.fn(),
});

describe("Unit test find product usecase", () => {
  it("should find a product by id", async () => {
    const mockProductRepository = MockRepository();
    const findProductUseCase = new FindProductUsecase(mockProductRepository);
    const result = await findProductUseCase.execute("1");

    expect(result).toEqual(productMock);
  });

  it("should throw an error when product is not found", async () => {
    const mockProductRepository = MockRepository();
    const findProductUseCase = new FindProductUsecase(mockProductRepository);
    mockProductRepository.findById.mockResolvedValue(null);

    await expect(findProductUseCase.execute("2")).rejects.toThrow(
      "Product not found"
    );
  });
});
