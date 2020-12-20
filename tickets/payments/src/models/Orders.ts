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
interface OrderModel extends Model<OrderDocument> {
  build(order: IOrder): OrderDocument;
}
orderSchema.set("versionKey", "version");
orderSchema.plugin(updateIfCurrentPlugin);

const Order = model<OrderDocument, OrderModel>("orders", orderSchema);

orderSchema.statics.build = (order: IOrder) => {
  return new Order({
    _id: order.id,
    ...order,
  });
};
export { Order };
