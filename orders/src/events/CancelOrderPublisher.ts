import { Publisher, OrderCancelledEvent, Subjects } from "@scope/common";

export class CancelOrderPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
