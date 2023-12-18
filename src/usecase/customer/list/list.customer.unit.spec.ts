import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street", 123, "zip", "city")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Street 2", 456, "zip 2", "city 2")
);

const MockRepository = () => {
  return {
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test list customer use case", () => {
  it("should list customers", async () => {
    const customerRepository = MockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);

    const output = await listCustomerUseCase.execute({});

    expect(output.customers.length).toBe(2);
    expect(output.customers[0].id).toEqual(customer1.id);
    expect(output.customers[0].name).toEqual(customer1.name);
    expect(output.customers[0].address.street).toEqual(
      customer1.Address.street
    );

    expect(output.customers[1].id).toEqual(customer2.id);
    expect(output.customers[1].name).toEqual(customer2.name);
    expect(output.customers[1].address.street).toEqual(
      customer2.Address.street
    );
  });
});
