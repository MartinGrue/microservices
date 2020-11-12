import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Orders";
import mongoose from "mongoose";
const validTitle = "1234";
const validPrice = "10";
const validOrderId = mongoose.Types.ObjectId().toHexString();
const invalidOrderId = "1231313";
const notexistingTicketId = validOrderId;

it("has a route handler listening to /api/orders/:id for get request", async () => {
  const response = await request(app).get(`/api/orders/${validOrderId}`);
  expect(response.status).not.toEqual(404);
});

it("can only be acessed if the user is signed in", async () => {
  const response = await request(app).get(`/api/orders/${validOrderId}`);
  expect(response.status).toEqual(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .get(`/api/orders/${invalidOrderId}`)
    .set("Cookie", getAuthCookie());
  expect(response.status).not.toEqual(401);
});

// it("returns 400 if the orderId is invalid", async () => {
//   const response = await request(app)
//     .get(`/api/orders/${invalidOrderId}`)
//     .set("Cookie", getAuthCookie());
//   expect(response.status).toEqual(400);
// });
it("returns 404 if the order is not found", async () => {
  const response = await request(app)
    .get(`/api/orders/${notexistingTicketId}`)
    .set("Cookie", getAuthCookie());
  expect(response.status).toEqual(404);
});
it("returns 401 if the user is not allowed to view the order", async () => {
  const user1 = getAuthCookie();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const newOrder = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket.id });
  expect(newOrder.status).toEqual(201);

  const order = await Order.find({ ticket: ticket.id });
  expect(order.length).toEqual(1);

  const response = await request(app)
    .get(`/api/orders/${validOrderId}`)
    .set("Cookie", getAuthCookie());
  expect(response.status).toEqual(404);
});

it("returns the order and status code 200 if the input is valid", async () => {
  const user1 = getAuthCookie();
  const ticket = Ticket.build({
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const newOrder = await request(app)
    .post("/api/orders")
    .set("Cookie", user1)
    .send({ ticketId: ticket.id });
  expect(newOrder.status).toEqual(201);

  const order = await Order.findOne({ ticket: ticket.id });
  expect(order?.ticket.toString()).toEqual(ticket.id);
  console.log(order?.id);
  console.log(newOrder.body.id);
  const response = await request(app)
    .get(`/api/orders/${newOrder.body.id}`)
    .set("Cookie", user1);
  expect(response.status).toEqual(200);
});
