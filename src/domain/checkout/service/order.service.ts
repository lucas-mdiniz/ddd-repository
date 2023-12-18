import Customer from "../../customer/entity/customers";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import { v4 as uuid } from "uuid";

export default class OrderService {
  static calculateTotal(orders: Order[]): number {
    return orders.reduce((total, order) => {
      return total + order.calculateTotal();
    }, 0);
  }

  // no método placeOrder, precisamos utilizar o Customer e o OrderItem (entidades diferentes), logo ele deve ficar na camada de serviço e não de entidade
  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) throw new Error("Order must have at least 1 item");

    const order = new Order(uuid(), customer.id, items);
    customer.addRewardPoints(order.calculateTotal() * 0.5);

    return order;
  }
}
