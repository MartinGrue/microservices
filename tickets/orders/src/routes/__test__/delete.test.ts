import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import mongoose from "mongoose";
import { natsWrapper } from "../../NatsWrapper";
const validTitle = "1234";
const validPrice = "10";
const validOrderId = mongoose.Types.ObjectId().toHexString();
const invalidOrderId = "1231313";
const notexistingOrderId = validOrderId;

it("returns 404 if the provided order id does not exist", async () => {
  const response = await request(app)
    .delete(`/api/orders/${notexistingOrderId}`)
    .set("Cookie", getAuthCookie());
  expect(response.status).toEqual(404);
});

it("returns 400 if the order id is invalid", async () => {
  const response = await request(app)
    .delete(`/api/orders/${invalidOrderId}`)
    .set("Cookie", getAuthCookie());
  expect(response.status).toEqual(400);
});

it("returns 401 if the user is not authenticated", async () => {
  const cookie = getAuthCookie();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const newOrder = await request(app)
    .post("api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: newTicket.body.id });
  expect(newOrder.status).toEqual(201);

  const response = await request(app).delete(`/api/orders/${newOrder.body.id}`);

  expect(response.status).toEqual(401);
});

it("returns 401 if the user is not allowed to delete an order", async () => {
  const cookie = getAuthCookie();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const newOrder = await request(app)
    .post("api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: newTicket.body.id });
  expect(newOrder.status).toEqual(201);

  const response = await request(app)
    .delete(`/api/orders/${newOrder.body.id}`)
    .set("Cookie", getAuthCookie());

  expect(response.status).toEqual(401);
});

it("returns 200 and delete the order with valid order id", async () => {
  const cookie = getAuthCookie();

  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const newOrder = await request(app)
    .post("api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: newTicket.body.id });
  expect(newOrder.status).toEqual(201);

  const response = await request(app)
    .delete(`/api/orders/${newOrder.body.id}`)
    .set("Cookie", cookie);

  expect(response.status).toEqual(200);
});
it("publishes an event", async () => {
  const cookie = getAuthCookie();
  const newTicket = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const newOrder = await request(app)
  .post("api/orders")
  .set("Cookie", cookie)
  .send({ ticketId: newTicket.body.id });
expect(newOrder.status).toEqual(201);

  const response = await request(app)
    .delete(`/api/orders/${newOrder.body.id}`)
    .set("Cookie", cookie)

  expect(response.status).toEqual(200);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
