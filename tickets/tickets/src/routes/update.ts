import express, { Request, Response, NextFunction } from "express";
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  currentUser,
  NotAuthorizedError,
} from "@scope/common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";

const router = express.Router();
router.put(
  "/api/tickets/:id",
  currentUser,
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required"),
    body("price").not().isEmpty().withMessage("Price is required"),
  ],
  validateRequest,
  async (
    req: Request<{ id: string }, { title: string; price: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, price } = req.body;
      console.log(req.params.id);
      const ticket = await Ticket.findById(req.params.id.toString());
      if (!ticket) {
        throw new BadRequestError("invalid Ticket Id");
      }
      if (req.currentUser!.currentUser!.userId !== ticket.userId) {
        throw new NotAuthorizedError();
      }
      ticket.title = title;
      ticket.price = price;
      ticket.save();
      res.status(200).send(ticket);
    } catch (error) {
      next(error);
    }
  }
);
export { router as updateTicketRouter };