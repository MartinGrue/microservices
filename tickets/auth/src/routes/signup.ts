import express, { Request, Response } from "express";
import "express-async-errors";
import { body, validationResult } from "express-validator";
import {
  RequestValidationError,
  DataBaseConnectionError,
  BadRequestError,
} from "../errors/ErrorTypes";
import { User } from "../models/User";
import jsonwebtoken from "jsonwebtoken";

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
    const { email, password } = req.body;
    const userFromDB = await User.findOne({ email });
    if (userFromDB) {
      throw new BadRequestError("Email already exists");
    }
    const user = User.build({ email, password });
    await user.save();

    const token = jsonwebtoken.sign(
      { userId: user._id, email: user.email },
      "Token_KEY_GOES_HERE"
    );
    req.session!["jwt"] = token;
    res.status(201).send(user);
  }
);
router.get("/api/users/signup", (req, res) => {
  console.log("Hi from router");
  res.send();
});
export { router as signupRouter };
