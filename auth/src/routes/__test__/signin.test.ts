import request from "supertest";
import app from "../../app";

const validEmail = "test@test.com";
const inValidEmail = "1";
const noEmail = "";
const noPassword = "";
const validPassword = "1234";

it("returns a 200 on successful signin", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword })
    .expect(200);
});

it("returns a 400 if no email is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: noEmail, password: validPassword })
    .expect(400);
});

it("returns a 400 if no email of type email is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: inValidEmail, password: validPassword })
    .expect(400);
});
it("returns a 400 if no password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: noPassword })
    .expect(400);
});
it("returns a 404 if wrong password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword.concat("0") })
    .expect(404);
});
it("returns a 404 if wrong email is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);
  return request(app)
    .post("/api/users/signin")
    .send({ email: "0".concat(validEmail), password: validPassword })
    .expect(404);
});
it("returns a 404 if user does not exists", async () => {
  return request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword })
    .expect(404);
});

it("set a cookie on successful signin", async () => {
  //this will onyl pass if cookieSession({secure:false}); supertest uses http no https
  await request(app)
    .post("/api/users/signup")
    .send({ email: validEmail, password: validPassword })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: validEmail, password: validPassword })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
