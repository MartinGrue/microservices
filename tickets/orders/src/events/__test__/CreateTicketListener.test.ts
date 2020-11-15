import { Message } from "node-nats-streaming";
import { TicketCreatedEvent } from "@scope/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";
import { CreateTicketListener } from "../CreateTicketListener";
import { Ticket } from "../../models/Ticket";

const setup = () => {
  const listener = new CreateTicketListener(natsWrapper.client);
  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "testtitle",
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, data, msg };
};
it("creates and saves a ticket", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});
it("acks the message", async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
