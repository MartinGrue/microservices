import { Message } from "node-nats-streaming";
import { PaymentCreatedEvent, OrderStatus } from "@scope/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";
import { PaymentCreatedListener } from "../PaymentCreatedListener";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Orders";

const setup = async () => {
  const listener = new PaymentCreatedListener(natsWrapper.client);

  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "test",
    price: 1,
  });
  await ticket.save();
  const order = Order.build({
    status: OrderStatus.Created,
    userId: "12323",
    expiresAt: new Date(),
    ticket,
  });
  await order.save();

  const data: PaymentCreatedEvent["data"] = {
    id: "abc",
    stripeId: "abc",
    orderId: order.id ? order.id : undefined,
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, order, ticket, data, msg };
};

it("updated the order status to completed", async () => {
  const { listener, order, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(data.orderId);
  expect(updatedOrder).toBeDefined();
  expect(updatedOrder!.status).toEqual(OrderStatus.Complete);
});

it("throws an error when the order to be updated can not be found", async (done) => {
  const { msg, data, listener, ticket } = await setup();

  data.orderId = new mongoose.Types.ObjectId().toHexString();

  try {
    await listener.onMessage(data, msg);
  } catch (err) {
    return done();
  }
});
it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
