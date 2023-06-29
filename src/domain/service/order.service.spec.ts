import Customer from "../entity/customers";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should calculate total price of all orders", () => {
    const item1 = new OrderItem("1", "OrderItem 1", 100, "p1", 1);
    const item2 = new OrderItem("2", "OrderItem 2", 200, "p2", 2);

    const order1 = new Order("1", "c1", [item1]);
    const order2 = new Order("2", "c2", [item2]);

    const total = OrderService.calculateTotal([order1, order2]);

    expect(total).toBe(500);
  });

  it("should place an order", () => {
    const customer = new Customer("1", "Customer 1");
    const item1 = new OrderItem("1", "OrderItem 1", 100, "p1", 1);

    const order = OrderService.placeOrder(customer, [item1]);

    expect(customer.rewardPoints).toBe(50);
    expect(order.calculateTotal()).toBe(100);
  });
});
