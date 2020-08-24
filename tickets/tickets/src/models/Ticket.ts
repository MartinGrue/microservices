import mongoose, { Schema, Document, Model, model } from "mongoose";
const ticketSchema: Schema<TicketDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },

  {
    collection: "ticket",
    toJSON: {
      transform(doc: TicketDocument, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

interface ITicket {
  title: string;
  price: string;
  userId: string;
}
interface TicketDocument extends Document, ITicket {}

interface TicketModel extends Model<TicketDocument> {
  build(ticket: ITicket): TicketDocument;
}

const Ticket = model<TicketDocument, TicketModel>("ticket", ticketSchema);
Ticket.build = (ticket: ITicket) => {
  return new Ticket(ticket);
};
export { Ticket };
