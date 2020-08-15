import express from "express";
const router = express.Router();

router.get("api/users/currentuser", (req, res) => {
  console.log("Hi from router");
});

export { router as currentUserRouter };
