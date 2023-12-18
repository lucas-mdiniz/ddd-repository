import Customer from "./domain/customer/entity/customers";
import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_item";
import Address from "./domain/customer/value-object/address";

let customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "12345678", "City");
customer.changeAddress(address);
customer.activate();
// ID

// Objeto - Entidade
const item1 = new OrderItem("1", "Item 1", 10, "p1", 2);
const item2 = new OrderItem("2", "Item 2", 20, "p2", 2);
const order = new Order("1", "123", [item1, item2]);
