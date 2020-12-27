import mongoose, { Document } from "mongoose";

interface IPayment {
  orderId: string;
  stripeId: string;
}

interface PaymentDoc extends Document, IPayment {}

const paymentSchema = new mongoose.Schema(
  {
    orderId: {
      required: true,
      type: String,
    },
    stripeId: {
      required: true,
      type: String,
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
interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: IPayment): PaymentDoc;
}
paymentSchema.statics.build = (attrs: IPayment) => {
  return new Payment(attrs);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
  "Payment",
  paymentSchema
);

export { Payment };
