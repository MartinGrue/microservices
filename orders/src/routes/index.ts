import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validateRequest, currentUser } from "@scope/common";

import { Order } from "../models/Orders";
const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({
      userId: req.currentUser!.currentUser!.userId,
    }).populate("ticket");
    res.status(200).send(orders);
  }
);
export { router as indexOrderRouter };
