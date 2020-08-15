import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("password must be between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).send(errors.array());
    }
    const { email, password } = req.body;

    console.log("Hi from creating user");
    res.send();
  }
);
router.get("/api/users/signup", (req, res) => {
    console.log("Hi from router");
    res.send()
  });
export { router as signupRouter };
