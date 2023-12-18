import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("CustomerFactory unit tests", () => {
  it("should create a customer with id and name", () => {
    let customer = CustomerFactory.create("Jhon");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with id, name and address", () => {
    const address = new Address("Street 1", 123, "12345678", "São Paulo");
    let customer = CustomerFactory.createWithAddress("Jhon", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Jhon");
    expect(customer.Address).toBe(address);
  });
});
