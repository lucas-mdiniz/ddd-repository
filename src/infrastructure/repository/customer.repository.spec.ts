import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import Customer from "../../domain/entity/customers";
import CustomerRepository from "./customer.repository";
import Address from "../../domain/entity/address";

describe("Customer repository unit tests", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive,
      street: address.street,
      number: address.number,
      zip: address.zip,
      city: address.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    customer.activate();
    customer.addRewardPoints(10);

    const newAddress = new Address("Street 2", 2, "87654321", "City 2");
    customer.changeAddress(newAddress);

    await customerRepository.update(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "1",
      name: customer.name,
      active: customer.isActive,
      street: newAddress.street,
      number: newAddress.number,
      zip: newAddress.zip,
      city: newAddress.city,
      rewardPoints: customer.rewardPoints,
    });
  });

  it("should find a customer by id", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "12345678", "City 1");
    customer.changeAddress(address);

    await customerRepository.create(customer);

    const customerModel = await customerRepository.findById(customer.id);

    expect(customerModel).toStrictEqual(customer);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.findById("12d")).rejects.toThrow(
      "Customer not found"
    );
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("1", "Customer 1");
    const address1 = new Address("Street 1", 1, "12345678", "City 1");
    customer1.changeAddress(address1);
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("2", "Customer 2");
    const address2 = new Address("Street 2", 2, "87654321", "City 2");
    customer2.changeAddress(address2);
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
