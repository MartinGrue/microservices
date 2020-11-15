import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import { Ticket, TicketDocument } from "../../models/Ticket";
import mongoose from "mongoose";
const validTitle = "1234";
const validPrice = "10";
const cookieUser1 = getAuthCookie();
const cookieUser2 = getAuthCookie();

const buildTicket = async () => {
  const ticket = Ticket.build({
    ticketId: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  return ticket;
};
const createOrder = async (ticket: TicketDocument, cookie: string[]) => {
  const response = await request(app)
    .post("/api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: ticket.id });
  expect(response.status).toEqual(201);
  return response;
};
it("returns 200 and all the created orders for one particular user", async () => {
  const ticket1 = await buildTicket();
  const ticket2 = await buildTicket();
  const ticket3 = await buildTicket();
  const ticket4 = await buildTicket();

  await createOrder(ticket1, cookieUser1);
  await createOrder(ticket2, cookieUser1);
  await createOrder(ticket3, cookieUser2);
  await createOrder(ticket4, cookieUser2);

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", cookieUser1);
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(2);
});
