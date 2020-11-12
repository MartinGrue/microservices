import mongoose, { Schema, Document, Model, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { TicketDocument } from "./Ticket";

interface IOrder {
  userId: string;
  status: string;
  expiresAt: Date;
  ticket: TicketDocument;
}
interface OrderDocument extends Document, IOrder {
  version: number;
}
const orderSchema: Schema<OrderDocument> = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ticket",
    },
  },

  {
    toJSON: {
      transform(doc: OrderDocument, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

interface OrderModel extends Model<OrderDocument> {
  build(order: IOrder): OrderDocument;
}

const Order = model<OrderDocument, OrderModel>("orders", orderSchema);
Order.build = (order: IOrder) => {
  return new Order(order);
};
export { Order };
