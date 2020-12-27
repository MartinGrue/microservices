import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import mongoose from "mongoose";
const validTitle = "1234";
const validPrice = "10";
const validTicketId = mongoose.Types.ObjectId().toHexString();
const invalidTicketId = "1231313";
const notexistingTicketId = validTicketId;

it("returns 400 if the ticket is invalid", async () => {
  const response = await request(app)
    .get(`/api/tickets/${invalidTicketId}`)
    .send();
  expect(response.status).toEqual(400);
});
it("returns 404 if the ticket is not found", async () => {
  const response = await request(app)
    .get(`/api/tickets/${notexistingTicketId}`)
    .send({ title: validTitle.concat("0") });
  expect(response.status).toEqual(404);
});
it("returns the ticket if the ticket is found", async () => {
  const newTicket = await request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });

  expect(newTicket.status).toEqual(201);
  const getTicket = await request(app)
    .get(`/api/tickets/${newTicket.body.id}`)
    .send({});
  expect(getTicket.status).toEqual(200);
  expect(getTicket.body.title).toEqual(validTitle);
});
