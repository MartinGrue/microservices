import { Listener } from "./BaseListener";
import { OrderCancelledEvent } from "./EventTypes";
import { Message } from "node-nats-streaming";
import { Subjects } from "./Subjects";

export class CancelOrderListener extends Listener<OrderCancelledEvent> {
  onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
  queueGroupName = "test";
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
