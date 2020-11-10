import { Stan } from "node-nats-streaming";
import { Publisher } from "./BasePublisher";
import { Event, TicketUpdatedEvent } from "./EventTypes";
import { Subjects } from "./Subjects";

export class UpdateTicketPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = "test";
}
