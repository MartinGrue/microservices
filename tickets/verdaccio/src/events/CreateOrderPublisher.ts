import { Stan } from "node-nats-streaming";
import { Publisher } from "./BasePublisher";
import { Event, OrderCreatedEvent } from "./EventTypes";
import { Subjects } from "./Subjects";

export class CreateOrderPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = "test";
}
