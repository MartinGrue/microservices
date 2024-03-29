import {
  Subjects,
  Listener,
  PaymentCreatedEvent,
  OrderStatus,
} from "@scope/common";
import { Message } from "node-nats-streaming";
import { quegrpName } from "./queueGroupName";
import { Order } from "../models/Orders";
export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
  queueGroupName = quegrpName;

  async onMessage(data: PaymentCreatedEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({
      status: OrderStatus.Complete,
    });
    await order.save();

    msg.ack();
  }
}
