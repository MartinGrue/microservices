import request from "supertest";
import app from "../app";

export const getAuthCookie = async (): Promise<string[]> => {
  const validEmail = "test@test.com";
  const validPassword = "1234";

  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  const cookie = authResponse.get("Set-Cookie");
  return cookie;
};
