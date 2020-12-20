import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, OrderCancelledEvent } from "@scope/common";
import { queueGroupName } from "./queueGroupName";

export class CancelOrderListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;
  onMessage = async (data: OrderCancelledEvent["data"], msg: Message) => {
    

    msg.ack();
  };
}
