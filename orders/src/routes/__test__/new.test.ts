import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Orders";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";
const invalidTicketId = "";
const validTitle = "1234";
const validPrice = "10";
const invalidPrice = "";
const validUserId = "12312123";

it("has a route handler listening to /api/orders for post request", async () => {
  const response = await request(app).post("/api/orders").send({});
  expect(response.status).not.toEqual(404);
});

it("can only be acessed if the user is signed in", async () => {
  const response = await request(app).post("/api/orders").send({});
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("returns an error if no ticketId is provided in the body", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({});
  expect(response.status).toEqual(400);
});

it("returns an 400 error if a invalid ticketId is provided in the body", async () => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: invalidTicketId });
  expect(response.status).toEqual(400);
});
it("returns 401 if the user is not allowed to create an order", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .send({ ticketId: ticket.id });
  expect(response.status).toEqual(401);
});
it("returns 404 if the tickerid is valid but can not be found", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: new mongoose.Types.ObjectId().toHexString() });
  expect(response.status).toEqual(404);
});
it("returns an error if the ticket is already reserved", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const reserve = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: ticket.id });
  expect(reserve.status).toEqual(201);

  const reserveAgain = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: ticket.id });
  expect(reserveAgain.status).toEqual(404);
});
it("creates an order if the input is correct", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: ticket.id });
  expect(response.status).toEqual(201);

  const orders = await Order.find({});
  expect(orders.length).toEqual(1);
});
it("publishes an event", async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", getAuthCookie())
    .send({ ticketId: ticket.id });
  expect(response.status).toEqual(201);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
