import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Subjects, OrderStatus, OrderCancelledEvent } from "@scope/common";
import { natsWrapper } from "../../NatsWrapper";
import { CancelOrderListener } from "../CancelOrderListener";
import { Order } from "../../models/Orders";

const setup = async () => {
  const listener = new CancelOrderListener(natsWrapper.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.Created,
    price: 10,
    userId: "asldkfj",
  });
  await order.save();

  const data: OrderCancelledEvent["data"] = {
    id: order.id ? order.id : "",
    version: 1,
    ticket: {
      id: "asldkfj",
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it("updates the status of the order", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updatedOrder = await Order.findById(order.id);

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled);
});

it("acks the message", async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
