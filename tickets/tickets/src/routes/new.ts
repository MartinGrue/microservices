import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validateRequest, currentUser } from "@scope/common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";
import { natsWrapper } from "../NatsWrapper";
import {CreateTicketPublisher} from "../events/CreateTicketPublisher"
const router = express.Router();

router.post(
  "/api/tickets",

  currentUser,
  requireAuth,

  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").not().isEmpty().withMessage("price is required"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, price } = req.body;
      const ticket = Ticket.build({
        title,
        price,
        userId: req.currentUser!.currentUser!.userId,
      });
      await ticket.save();
      await new CreateTicketPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
        version: ticket.version,
      });
      return res.status(201).send(ticket);
    } catch (error) {
      next(error);
    }
  }
);
export { router as createTicketRouter };
