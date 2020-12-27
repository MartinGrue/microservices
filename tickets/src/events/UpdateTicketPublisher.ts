import { Publisher, Subjects, TicketUpdatedEvent } from '@scope/common';

export class UpdateTicketPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}