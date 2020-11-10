import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../NatsWrapper";
const validTitle = "1234";
const invalidTitle = "";
const validPrice = "10";
const invalidPrice = "";
const validUserId = "12312123";

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

it("returns an error if no title is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: "", price: validPrice });
  expect(response.status).toEqual(400);
});

it("returns an 400 error if a invalid title is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: invalidTitle, price: validPrice });
  expect(response.status).toEqual(400);
});

it("returns an error if no price is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle });
  expect(response.status).toEqual(400);
});
it("returns an error if an invalid price is provided", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: invalidPrice });
  expect(response.status).toEqual(400);
});

it("creates an ticket if input is correct", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });
  expect(response.status).toEqual(201);

  const tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(validTitle);
});

it("publishes an event", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });
  expect(response.status).toEqual(201);

  console.log(natsWrapper);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
