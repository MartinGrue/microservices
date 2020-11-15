import { Publisher, Subjects, TicketCreatedEvent } from "@scope/common";

export class CreateTicketPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
