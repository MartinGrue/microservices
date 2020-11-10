import express, { Request, Response, NextFunction } from "express";
import {
  CancelOrderPublisher,
  requireAuth,
  validateRequest,
  currentUser,
  BadRequestError,
  NotAuthorizedError,
  OrderStatus,
} from "@scope/common";
import mongoose from "mongoose";
import { Order } from "../models/Orders";
import { body } from "express-validator";

import { natsWrapper } from "../NatsWrapper";
const router = express.Router();

router.delete(
  "/api/orders/:orderId",

  currentUser,
  requireAuth,

  validateRequest,
  async (
    req: Request<{ orderId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId).populate("ticket");
      if (!order) {
        throw new BadRequestError("invalid order Id");
      }
      if (req.currentUser!.currentUser!.userId !== order.userId) {
        throw new NotAuthorizedError();
      }

      order.status = OrderStatus.Cancelled;
      new CancelOrderPublisher(natsWrapper.client).publish({
        id: order.id,
        version: order.version,
        ticket: {
          id: order.ticket.id,
        },
      });
      res.status(204).send(order);
    } catch (error) {
      next(error);
    }
  }
);
