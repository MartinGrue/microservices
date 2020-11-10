import { Listener } from "./BaseListener";
import { OrderCreatedEvent } from "./EventTypes";
import { Message } from "node-nats-streaming";
import { Subjects } from "./Subjects";

export class CreateOrderListener extends Listener<OrderCreatedEvent> {
  onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
  queueGroupName = "test";
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
