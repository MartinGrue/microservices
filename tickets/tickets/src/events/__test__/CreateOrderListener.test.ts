import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../NatsWrapper";
import { CreateOrderListener } from "../CreateOrderListener";
import mongoose from "mongoose";
import { OrderCreatedEvent, OrderStatus } from "@scope/common";
const setup = async () => {
  // Create an instance of the listener
  const listener = new CreateOrderListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    title: "concert",
    price: 99,
    userId: "asdf",
  });
  await ticket.save();

  // Create the fake data event
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "alskdfj",
    expiresAt: "alskdjf",
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};
it("throws an error when the ticket to be updated can not be found", async (done) => {
  // Create a listener
  const listener = new CreateOrderListener(natsWrapper.client);

  // Create and a fake ticket
  const ticket = Ticket.build({
    title: "new title",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();
  const orderId = mongoose.Types.ObjectId().toHexString();

  // Create a fake data object
  const data: OrderCreatedEvent["data"] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: "alskdfj",
    expiresAt: "alskdjf",
    ticket: {
      id: new mongoose.Types.ObjectId().toHexString(),
      price: ticket.price,
    },
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  try {
    await listener.onMessage(data, msg);
  } catch (error) {
    return done();
  }
});
it("sets the orderId of the ticket", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it("publishes a ticket updated event", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});
