import express, { Request, Response, NextFunction } from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  OrderStatus,
} from "@scope/common";
import mongoose from "mongoose";
import { Order } from "../models/Orders";
import { Ticket } from "../models/Ticket";
import { body } from "express-validator";
import { CreateOrderPublisher } from "../events/CreateOrderPublisher";
import { natsWrapper } from "../NatsWrapper";

const EXPIRATION_WINDOW_SECONDS = 100 * 60;
const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId(input))
      .withMessage("TicketId must be provided"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ticketId } = req.body;
      const ticket = await Ticket.findById(ticketId);
      console.log("ticket found: ", ticket);
      if (!ticket) {
        throw new BadRequestError("Can not find Ticket");
      }
      const isReserved = await ticket.isReserved();
      if (isReserved) {
        throw new BadRequestError("Ticket is already reserved");
      }
      const expiration = new Date();
      expiration.setSeconds(
        expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS
      );
      const order = Order.build({
        expiresAt: expiration,
        status: OrderStatus.Created,
        ticket,
        userId: req.currentUser!.currentUser!.userId,
      });
      await order.save();
      if (order.id && ticket.id) {
        await new CreateOrderPublisher(natsWrapper.client).publish({
          id: order.id,
          version: order.version,
          status: OrderStatus.Created,
          userId: order.userId,
          expiresAt: order.expiresAt.toISOString(),
          ticket: {
            id: ticket.id,
            price: ticket.price,
          },
        });
      }

      return res.status(201).send(order);
    } catch (error) {
      next(error);
    }
  }
);
export { router as createOrderRouter };
