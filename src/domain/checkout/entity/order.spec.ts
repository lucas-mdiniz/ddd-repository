import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      new Order("", "123", []);
    }).toThrowError("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order("123", "", []);
    }).toThrowError("CustomerId is required");
  });

  it("should throw error when item quantity is 0", () => {
    expect(() => {
      new Order("123", "123", []);
    }).toThrowError("Items are required");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
    const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
    const order = new Order("1", "123", [item1]);

    let total = order.calculateTotal();

    expect(total).toBe(20);

    const order2 = new Order("1", "123", [item1, item2]);

    total = order2.calculateTotal();

    expect(total).toBe(60);
  });

  it("should throw error if the item quantity is less or equal 0", () => {
    expect(() => {
      const item1 = new OrderItem("1", "Item 1", 10, "p1", 0);
      new Order("1", "123", [item1]);
    }).toThrowError("Quantity must be greater than 0");
  });
});
