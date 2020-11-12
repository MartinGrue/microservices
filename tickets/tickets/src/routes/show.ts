import express, { Request, Response, NextFunction } from "express";
import { requireAuth, validateRequest, BadRequestError } from "@scope/common";
import { body } from "express-validator";
import { Ticket } from "../models/Ticket";

const router = express.Router();
router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.params.id);
      const ticket = await Ticket.findById(req.params.id);
      if (!ticket) {
        throw new BadRequestError("invalid Credentials");
      }
      res.status(200).send(ticket);
    } catch (error) {
      next(error);
    }
  }
);
export { router as showTicketRouter };
