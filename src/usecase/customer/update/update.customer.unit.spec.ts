import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Street", 123, "zip", "city")
);

const input = {
  id: customer.id,
  name: "John Updated",
  address: {
    street: "Street Updated",
    number: 1234,
    zip: "zip Updated",
    city: "city Updated",
  },
};

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test update customer use case", () => {
  it("should update customer", async () => {
    const customerRepository = MockRepository();
    const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await updateCustomerUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
