import { Subjects, Publisher, PaymentCreatedEvent } from '@sgtickets/common';

export class CreatePaymentsPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}