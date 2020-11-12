import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from "@scope/common";
import { Ticket } from "../models/Ticket";
import { quegrpName } from "./queueGroupName";

export class CreateTicketListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = quegrpName;
  onMessage = async (data: TicketCreatedEvent["data"], msg: Message) => {
    const { title, price, id } = data;
    const ticket = Ticket.build({ title, price, ticketId: id });
    await ticket.save();

    msg.ack();
  };
}
