import Address from "../value-object/address";
import Customer from "./customers";

describe("Customer unit tests", () => {
  it("should throw error when ID is empty", () => {
    expect(() => {
      let customer = new Customer("", "John Doe");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    //Arrange
    const customer = new Customer("123", "John Doe");

    //Act
    customer.changeName("Jane Doe");

    //Assert
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 123, "12345678", "City");
    customer.changeAddress(address);

    customer.activate();

    expect(customer.isActive).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street", 123, "12345678", "City");
    customer.changeAddress(address);

    customer.activate();

    customer.deactivate();

    expect(customer.isActive).toBe(false);
  });

  it("should throw error when address is undefined while activating a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");

      customer.activate();
    }).toThrowError("Address is required");
  });

  it("should add reward points to customer", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect;
  });
});
