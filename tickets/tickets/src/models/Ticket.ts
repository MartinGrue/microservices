import mongoose, { Schema, Document, Model, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface ITicket {
  title: string;
  price: number;
  userId: string;
}
interface TicketDocument extends Document, ITicket {
  version: number;
  orderId?: string;
}
const ticketSchema: Schema<TicketDocument> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
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
ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

interface TicketModel extends Model<TicketDocument> {
  build(ticket: ITicket): TicketDocument;
}

const Ticket = model<TicketDocument, TicketModel>("ticket", ticketSchema);
Ticket.build = (ticket: ITicket) => {
  return new Ticket(ticket);
};
export { Ticket };
