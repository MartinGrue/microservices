import request from "supertest";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
const validTitle = "1234";
const validPrice = "10";
const cookie = getAuthCookie();
const createTicket = async () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: validTitle, price: validPrice });
};

const createOrder = async (newTicket: request.Response) => {
  return request(app)
    .post("api/orders")
    .set("Cookie", cookie)
    .send({ ticketId: newTicket.body.id });
};
it("returns 200 and all the created orders", async () => {
  const newTicket = await createTicket();
  await createOrder(newTicket);
  await createOrder(newTicket);

  const response = await request(app).get("/api/orders").send();
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(2);
});
