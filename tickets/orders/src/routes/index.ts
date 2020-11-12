import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validateRequest, currentUser } from "@scope/common";

import { Order } from "../models/Orders";
const router = express.Router();

router.get(
  "/api/orders",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await Order.find({
        userId: req.currentUser!.currentUser!.userId,
      }).populate("ticket");

      // const ordersNotPopulated = await Order.find({
      //   userId: req.currentUser!.currentUser!.userId,
      // });
      // console.log("without populate: ", ordersNotPopulated);
      console.log(orders);
      res.status(200).send(orders);
    } catch (error) {
      next(error);
    }
  }
);
export { router as indexOrderRouter };
