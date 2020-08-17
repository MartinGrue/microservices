import express, { Request, Response } from "express";
import "express-async-errors";
import { body } from "express-validator";
import { BadRequestError } from "../errors/ErrorTypes";
import { User } from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import { validateRequest } from "../middleware/validate-request";

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
  validateRequest,
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const userFromDB = await User.findOne({ email });
      if (userFromDB) {
        throw new BadRequestError("Email already exists");
      }
      const user = User.build({ email, password });
      await user.save();

      const token = jsonwebtoken.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_KEY!
      );
      req.session!["jwt"] = token;
      res.status(201).send(user);
    } catch (error) {
      return res.status(422).send(error.massage);
    }
  }
);
router.get("/api/users/signup", (req, res) => {
  console.log("Hi from router");
  res.send();
});
export { router as signupRouter };
