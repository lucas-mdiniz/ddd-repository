import Address from "../../entity/address";
import Customer from "../../entity/customers";
import AddressUpdatedEvent from "../customer/address-updated.event";
import CustomerCreatedEvent from "../customer/customer-created.event";
import NotifyWhenAddressIsUpdatedHandler from "../customer/handler/notify-when-address-is-updated";
import NotifyWhenCustomerIsCreatedHandler1 from "../customer/handler/notify-when-customer-is-created-1";
import NotifyWhenCustomerIsCreatedHandler2 from "../customer/handler/notify-when-customer-is-created-2";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();

    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should notify all event handlers of a event", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      price: 100,
      description: "Product 1 description",
    });

    //Quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
    eventDispatcher.nofity(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new NotifyWhenCustomerIsCreatedHandler1();
    const eventHandler2 = new NotifyWhenCustomerIsCreatedHandler2();
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler1);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1",
      id: "2",
      active: true,
    });

    eventDispatcher.nofity(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should notify when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new NotifyWhenAddressIsUpdatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("AddressUpdatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
    ).toMatchObject(eventHandler);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "12345678", "City 1");
    customer.changeAddress(address);

    const addressUpdatedEvent = new AddressUpdatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.Address,
    });

    eventDispatcher.nofity(addressUpdatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
