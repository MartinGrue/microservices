import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../NatsWrapper";
import { CancelOrderListener } from "../CancelOrderListener";
import mongoose from "mongoose";
import { OrderCancelledEvent } from "@scope/common";
const setup = async () => {
  // Create a listener
  const listener = new CancelOrderListener(natsWrapper.client);

  // Create and a fake ticket
  const ticket = Ticket.build({
    title: "new title",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();
  const orderId = mongoose.Types.ObjectId().toHexString();

  // Create a fake data object
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: ticket.version + 1,
    ticket: { id: ticket.id },
  };

  // Create a fake msg object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  // return all of this stuff
  return { msg, data, ticket, listener };
};
it("throws an error when the ticket to be updated can not be found", async (done) => {
  // Create a listener
  const listener = new CancelOrderListener(natsWrapper.client);

  // Create and a fake ticket
  const ticket = Ticket.build({
    title: "new title",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });

  await ticket.save();
  const orderId = mongoose.Types.ObjectId().toHexString();

  // Create a fake data object
  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: ticket.version + 1,
    ticket: { id: new mongoose.Types.ObjectId().toHexString() },
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

it("updates the ticket status to cancelled", async () => {
  const { msg, data, ticket, listener } = await setup();
  await listener.onMessage(data, msg);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();
});
it("updates the ticket, publishes an event, and acks the message", async () => {
  const { msg, data, ticket, listener } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
