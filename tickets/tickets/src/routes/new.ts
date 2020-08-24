import express, { Request, Response } from "express";
import { requireAuth } from "@scope/common";

const router = express.Router();

router.post("/api/tickets", requireAuth, (req: Request, res: Response) => {
  console.log(req.currentUser);

  return res.sendStatus(200);
});
export { router as createTicketRouter };
