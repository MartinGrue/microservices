import express from "express";
import { currentUser } from "../middleware/currentUser";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();

router.get("/api/users/currentuser", currentUser,requireAuth , (req, res) => {
  console.log(req.currentUser);

  return res.send(req.currentUser);
});
export { router as currentUserRouter };
