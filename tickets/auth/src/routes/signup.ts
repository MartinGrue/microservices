import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { body } from "express-validator";
import { BadRequestError, RequestValidationError } from "@scope/common";
import { User } from "../models/User";
import jsonwebtoken from "jsonwebtoken";
import { validateRequest } from "@scope/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 10 })
      .withMessage("password must be between 4 and 10 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
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
      // set cookie on http header: Set-Cookie
      req.session!["jwt"] = token;
      res.status(201).send(user);
    } catch (error) {
      next(error);
    }
  }
);

export { router as signupRouter };
