import ListProductUseCase from "./list.product.usecase";

const product1 = {
  id: "1",
  name: "product1",
  price: 10,
};

const product2 = {
  id: "2",
  name: "product2",
  price: 20,
};

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test list product usecase", () => {
  it("should list all products", async () => {
    const mockProductRepository = MockRepository();
    const listProductUseCase = new ListProductUseCase(mockProductRepository);

    const output = await listProductUseCase.execute({});
    expect(output.products).toHaveLength(2);
    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toEqual(product1.id);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);

    expect(output.products[1].id).toEqual(product2.id);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].price).toEqual(product2.price);
  });
});
