import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customers";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "zip", "city");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    findById: jest.fn().mockReturnValue(Promise.resolve(customer)),
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find customer", async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "Street",
        number: 123,
        zip: "zip",
        city: "city",
      },
    };

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it("should throw error when customer not found", async () => {
    const customerRepository = MockRepository();

    customerRepository.findById.mockRejectedValueOnce(
      new Error("Customer not found")
    );

    const useCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: "123",
    };

    await expect(() => useCase.execute(input)).rejects.toThrow(
      "Customer not found"
    );
  });
});
