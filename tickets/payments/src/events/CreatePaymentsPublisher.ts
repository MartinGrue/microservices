import { Subjects, Publisher, PaymentCreatedEvent } from "@scope/common";

export class CreatePaymentsPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
