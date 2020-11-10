import express, { Request, Response, NextFunction } from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  currentUser,
  NotAuthorizedError,
} from "@scope/common";
import { Order } from "../models/Orders";

const router = express.Router();
router.get(
  "/api/orders/:ordersId",
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
      res.status(200).send(order);
    } catch (error) {
      next(error);
    }
  }
);
export { router as showTicketRouter };
