import request from "supertest";
import {app} from "../app";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
export const getAuthCookie = (): string[] => {
  process.env.JWT_KEY = "Token_KEY_GOES_HERE";
  const userId = mongoose.Types.ObjectId().toHexString();
  const email = "test@test.com";

  const token = jsonwebtoken.sign({ userId, email }, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
