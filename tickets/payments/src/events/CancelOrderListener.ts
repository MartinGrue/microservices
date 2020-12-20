import nats, { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  OrderCancelledEvent,
  OrderStatus,
} from "@scope/common";
import { queueGroupName } from "./queueGroupName";
import { Order } from "../models/Orders";

export class CancelOrderListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCancelledEvent["data"], msg: Message) => {
    const { ticket, id, version } = data;

    const order = await Order.findByEvent({
      id,
      version,
    });

    if (!order) {
      throw new Error("Order not found");
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    msg.ack();
  };
}
