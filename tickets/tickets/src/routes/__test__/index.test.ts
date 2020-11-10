import request from "supertest";
import {app} from "../../app";
import { getAuthCookie } from "../../test/helpers";
const validTitle = "1234";
const validPrice = "10";
const createTicket = async () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", getAuthCookie())
    .send({ title: validTitle, price: validPrice });
};
it("returns 200 and all the created tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send();
  expect(response.status).toEqual(200);
  expect(response.body.length).toEqual(4);
});
