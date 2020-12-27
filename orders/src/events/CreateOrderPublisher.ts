import { Publisher, OrderCreatedEvent, Subjects } from "@scope/common";

export class CreateOrderPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
