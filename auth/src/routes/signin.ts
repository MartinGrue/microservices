import express, { Request, Response, NextFunction, } from "express";
import { body } from "express-validator";
import { validateRequest } from "@scope/common";
import { User } from "../models/User";
import { BadRequestError } from "@scope/common";
import { Password } from "../utils/Password";
import jsonwebtoken from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("password must be supplied"),
  ],
  validateRequest,  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userFromDB = await User.findOne({ email });
      if (!userFromDB) {
        throw new BadRequestError("invalid Credentials");
      }
      const passwordMatch = await Password.compare(
        userFromDB.password,
        password
      );
      console.log("password compare: ", passwordMatch);
      if (!passwordMatch) {
        throw new BadRequestError("invalid Credentials");
      }
      const token = jsonwebtoken.sign(
        { userId: userFromDB.id, email: userFromDB.email },
        process.env.JWT_KEY!
      );
      // set cookie on http header: Set-Cookie
      req.session!["jwt"] = token;
      res.status(200).send(userFromDB);
    } catch (error) {next(error)}
  }
);

export { router as signinRouter };
