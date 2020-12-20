import { Message } from "node-nats-streaming";
import { ExpirationCompleteEvent, OrderStatus } from "@scope/common";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";
import { ExpirationCompleteListener } from "../ExpirationCompleteListener";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Orders";

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.client);

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

  const data: ExpirationCompleteEvent["data"] = {
    orderId: order.id ? order.id : undefined,
  };
  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };
  return { listener, order, ticket, data, msg };
};
it("updated the order status to cancelled", async () => {
  const { listener, order, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  const updatedOrder = await Order.findById(data.orderId);
  expect(updatedOrder).toBeDefined();
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});
it("emit an OrderCancelled event", async () => {
  const { listener, order, ticket, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
  const eventData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );
  expect(eventData.id).toEqual(order.id);
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
it("acks the message and does not change the order status, if the order is already completed", async () => {
  const { listener, data, msg, order } = await setup();
  order.set({ status: OrderStatus.Complete });
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
  expect(order!.status).toEqual(OrderStatus.Complete);
});
it("acks the message", async () => {
  const { listener, data, msg } = await setup();
  await listener.onMessage(data, msg);
  expect(msg.ack).toHaveBeenCalled();
});
