import { Listener } from "./BaseListener";
import { TicketUpdatedEvent } from "./EventTypes";
import { Message } from "node-nats-streaming";
import { Subjects } from "./Subjects";

export class UpdateTicketListener extends Listener<TicketUpdatedEvent> {
  onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    console.log("Event data!", data);
    msg.ack();
  }
  queueGroupName = "test";
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
