import nats, { Message } from "node-nats-streaming";
import {
  Subjects,
  Listener,
  ExpirationCompleteEvent,
  OrderStatus,
} from "@scope/common";
import { quegrpName } from "./queueGroupName";
import { Order } from "../models/Orders";
import { CancelOrderPublisher } from "./CancelOrderPublisher";
import { natsWrapper } from "../NatsWrapper";
export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName = quegrpName;
  onMessage = async (data: ExpirationCompleteEvent["data"], msg: Message) => {
    const { orderId } = data;

    const order = await Order.findById(orderId).populate("ticket");
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status === OrderStatus.Complete) {
     return  msg.ack();
    }
    order.set({ status: OrderStatus.Cancelled });
    console.log()
    await order.save();
    if (order.id && order.ticket.id) {
      new CancelOrderPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
          id: order.ticket.id,
        },
      });
    }
    msg.ack();
  };
}
