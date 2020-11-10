import request from "supertest";
import {app} from "../../app";
import { getAuthCookie } from "../../test/helpers";
import mongoose from "mongoose";

const validTitle = "1234";
const invalidTitle = "";
const validPrice = "10";
const invalidPrice = "";
const validTicketId = mongoose.Types.ObjectId().toHexString();
const invalidTicketId = "1231313";
const notexistingTicketId = validTicketId;

it("returns 404 if the provided ticket id does not exist", async () => {
  const response = await request(app)
    .put(`/api/tickets/${notexistingTicketId}`)
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle.concat("0"), price: validPrice });

  expect(response.status).toEqual(404);
});

it("returns 400 if the ticket id is invalid", async () => {
  const response = await request(app)
    .put(`/api/tickets/${invalidTicketId}`)
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle.concat("0"), price: validPrice });
  expect(response.status).toEqual(400);
});

it("returns 401 if the user is not authenticated", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });

  expect(newTicket.status).toEqual(201);

  const response = await request(app)
    .put(`/api/tickets/${validTicketId}`)
    .send({ title: validTitle.concat("0"), price: validPrice });

  expect(response.status).toEqual(401);
});

it("returns 400 if user provide a invalid title", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });

  expect(newTicket.status).toEqual(201);

  const response = await request(app)
    .put(`/api/tickets/${validTicketId}`)
    .set("Cookie", getAuthCookie())
    .send({ title: invalidTitle, price: validPrice.concat("0") });

  expect(response.status).toEqual(400);
});
it("returns 400 if user provide a invalid price", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });

  expect(newTicket.status).toEqual(201);

  const response = await request(app)
    .put(`/api/tickets/${validTicketId}`)
    .set("Cookie", getAuthCookie())
    .send({ title: validPrice.concat("0"), price: invalidPrice });

  expect(response.status).toEqual(400);
});

it("returns 401 if the user does not own the ticket", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const response = await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", getAuthCookie())
    .send({ title: validPrice.concat("0"), price: validPrice });

  expect(response.status).toEqual(401);
});

it("returns 200 and updates the ticket with valid input", async () => {
  const cookie = getAuthCookie();
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
  expect(newTicket.status).toEqual(201);

  const response = await request(app)
    .put(`/api/tickets/${newTicket.body.id}`)
    .set("Cookie", cookie)
    .send({ title: validPrice.concat("0"), price: validPrice });

  expect(response.status).toEqual(200);
});
