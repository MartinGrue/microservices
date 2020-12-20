import mongoose, { Model, Document, model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { OrderStatus } from "@scope/common";

interface IOrder {
  id: string;
  price: number;
  status: OrderStatus;
  userId: string;
}

interface OrderDocument extends Document {
  version: number;
}
interface OrderModel extends Model<OrderDocument> {
  build(order: IOrder): OrderDocument;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<OrderDocument | null>;
}
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
orderSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Order.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (order: IOrder) => {
  return new Order({
    _id: order.id,
    ...order,
  });
};
const Order = model<OrderDocument, OrderModel>("orders", orderSchema);

export { Order };
