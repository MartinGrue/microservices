import request from "supertest";
import app from "../../app";

const validEmail = "test@test.com";
const validPassword = "1234";

it("returns a 200 on successful singout", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  await request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword })
    .expect(200);
  return request(app).post("/api/users/signout").expect(200);
});

it("clear the cookie on successful signout", async () => {
  //this will onyl pass if cookieSession({secure:false}); supertest uses http no https
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword })
    .expect(200);

  const res = await request(app).post("/api/users/signout").expect(200);
  expect(res.get("Set-Cookie")[0]).toEqual(
    "express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
