import Customer from "../../../../domain/customer/entity/customers";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive,
      street: entity.Address.street,
      city: entity.Address.city,
      zip: entity.Address.zip,
      number: entity.Address.number,
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive,
        street: entity.Address.street,
        city: entity.Address.city,
        zip: entity.Address.zip,
        number: entity.Address.number,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } }
    );
  }

  async findById(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(customerModel.id, customerModel.name);

    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zip,
      customerModel.city
    );

    customer.changeAddress(address);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);

      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zip,
        customerModel.city
      );

      customer.changeAddress(address);

      customer.addRewardPoints(customerModel.rewardPoints);

      if (customerModel.active) {
        customer.activate();
      }

      return customer;
    });

    return customers;
  }
}
