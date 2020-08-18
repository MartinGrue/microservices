import request from "supertest";
import app from "../../app";

const validEmail = "test@test.com";
const inValidEmail = "1";
const noEmail = "";
const validPassword = "1234";
const invalidPassword_toSmall = "012";
const invalidPassword_toBig = "01234567890";
it("returns a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
});

it("returns a 400 if no email is supplied", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "", password: validPassword })
    .expect(400);
});

it("returns a 400 if no email of type email is supplied", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "t", password: validPassword })
    .expect(400);
});
it("returns a 400 if no password is supplied", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: "" })
    .expect(400);
});
it("returns a 400 if password is smaller than 4 char", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: invalidPassword_toSmall })
    .expect(400);
});
it("returns a 400 if password is bigger than 10 char", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: invalidPassword_toBig })
    .expect(400);
});
it("returns a 404 if email already exists", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(404);
});
it("set a cookie on successful signup", async () => {
  //this will onyl pass if cookieSession({secure:false}); supertest uses http no https
  const res = await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);

  expect(res.get("Set-Cookie")).toBeDefined();
});
