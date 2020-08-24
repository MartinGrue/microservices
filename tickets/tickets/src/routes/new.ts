import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validateRequest } from "@scope/common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";
const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").not().isEmpty().withMessage("Title is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { title, price } = req.body;
      const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.currentUser!.id,
      });
      await ticket.save();
      return res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);
export { router as createTicketRouter };
