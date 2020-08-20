import request from "supertest";
import app from "../../app";
import { getAuthCookie } from "../../test/helpers";
const validEmail = "test@test.com";
const validPassword = "1234";

it("respond with details about current user", async () => {
  const cookie = await getAuthCookie();

  const res = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);
  expect(res.body.currentUser.email).toEqual(validEmail);
});
it("respond with {currentuser:null} if not signed in and statusCode 200", async () => {
  const res = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);
  expect(res.body.currentUser).toEqual(null);
});
