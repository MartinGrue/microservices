import request from "supertest";
import app from "../../app";
import { getAuthCookie } from "../../test/helpers";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be acessed if the user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if a invalid title is provided", async () => {});

it("returns an error if an invalid price is provided", async () => {});

it("creates an ticket if input is correct", async () => {});
