import request from "supertest";
import app from "../app";
import jsonwebtoken from "jsonwebtoken";
export const getAuthCookie = (): string[] => {
  process.env.JWT_KEY = "Token_KEY_GOES_HERE";
  const id = "13213123123";
  const email = "test@test.com";

  const token = jsonwebtoken.sign({ id, email }, process.env.JWT_KEY!);
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString("base64");

  return [`express:sess=${base64}`];
};
