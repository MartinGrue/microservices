import nats, { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from "@scope/common";
import { Ticket } from "../models/Ticket";
import { quegrpName } from "./queueGroupName";

export class UpdateTicketListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = quegrpName;
  onMessage = async (data: TicketUpdatedEvent["data"], msg: Message) => {
    const { title, price, id, version } = data;
    console.log("ticket version in update listener: ", version);
    const ticket = await Ticket.findByEvent(data)
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  };
}
