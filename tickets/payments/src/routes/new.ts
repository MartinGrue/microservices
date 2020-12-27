import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
} from "@scope/common";
import { getStripe } from "../stripe";
import { Order } from "../models/Orders";
import { Payment } from "../models/Payments";
import { CreatePaymentsPublisher } from "../events/CreatePaymentsPublisher";
import { natsWrapper } from "../NatsWrapper";
const router = express.Router();

router.post(
  "/api/payments",
  requireAuth,
  [body("token").not().isEmpty(), body("orderId").not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new BadRequestError("invalid order Id");
    }
    if (req.currentUser!.currentUser!.userId !== order.userId) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError("Cannot pay for an cancelled order");
    }
    const stripeObj = getStripe();
    const charge = await stripeObj.charges.create({
      currency: "usd",
      amount: order.price * 100,
      source: token,
    });
    console.log(charge);
    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();
    if (payment.id) {
      // new CreatePaymentsPublisher(natsWrapper.client).publish({
      //   id: payment.id,
      //   orderId: payment.orderId,
      //   stripeId: payment.stripeId,
      // });
    }

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
