import express from "express";
import { currentUser } from "@scope/common";
import { requireAuth } from "@scope/common";

const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  console.log(req.currentUser);

  return res.send(req.currentUser);
});
export { router as currentUserRouter };
