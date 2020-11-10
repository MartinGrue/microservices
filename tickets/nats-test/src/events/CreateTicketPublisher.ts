import { Stan } from "node-nats-streaming";
import { Publisher } from "./BasePublisher";
import { Event, TicketCreatedEvent } from "./EventTypes";
import { Subjects } from "./Subjects";

export default class extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = "test";
}