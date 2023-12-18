import ProductFactory from "./product.factory";

describe("ProductFactory unit tests", () => {
  it("shoud create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("shoud create a product type b", () => {
    const product = ProductFactory.create("b", "Product B", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product B");
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe("ProductB");
  });

  it("shoud throw an error when type is invalid", () => {
    expect(() => {
      ProductFactory.create("c", "Product C", 1);
    }).toThrowError("Invalid product type");
  });
});
