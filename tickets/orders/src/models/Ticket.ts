import mongoose, { Schema, Document, Model, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@scope/common";
import {Order} from "./Orders"
interface ITicket {
  title: string;
  price: number;
}
export interface TicketDocument extends Document, ITicket {
  version: number;
  isReserved(): Promise<boolean>;
}
interface TicketModel extends Model<TicketDocument> {
  build(ticket: ITicket): TicketDocument;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDocument | null>;
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
  },

  {
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

ticketSchema.methods.isReserved = async function () {
  // this === the ticket document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Ticket = model<TicketDocument, TicketModel>("ticket", ticketSchema);
Ticket.build = (ticket: ITicket) => {
  return new Ticket(ticket);
};
export { Ticket };
