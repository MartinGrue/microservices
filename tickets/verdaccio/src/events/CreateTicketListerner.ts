import { Listener } from "./BaseListener";
import { TicketCreatedEvent } from "./EventTypes";
import { Message } from "node-nats-streaming";
import { Subjects } from "./Subjects";

export default class extends Listener<TicketCreatedEvent> {
  onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    console.log("Event data!", data);

    console.log(data.id);
    console.log(data.title);
    console.log(data.price);

    msg.ack();
  }
  queueGroupName = "test";
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
