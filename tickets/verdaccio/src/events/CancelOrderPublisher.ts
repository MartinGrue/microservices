import { Stan } from "node-nats-streaming";
import { Publisher } from "./BasePublisher";
import { Event, OrderCancelledEvent } from "./EventTypes";
import { Subjects } from "./Subjects";

export class CancelOrderPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = "test";
}
