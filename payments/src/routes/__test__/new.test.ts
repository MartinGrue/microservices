import mongoose from "mongoose";
import request from "supertest";
import { OrderStatus } from "@scope/common";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";
import { getStripe } from "../../stripe";
import { Order } from "../../models/Orders";
import { Payment } from "../../models/Payments";

it("returns a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie())
    .send({
      token: "asldkfj",
      orderId: mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});
it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId: mongoose.Types.ObjectId().toHexString(),
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie())
    .send({
      token: "asldkfj",
      orderId: order.id,
    })
    .expect(401);
});
it("returns a 404 when purchasing a cancelled order", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    price: 20,
    status: OrderStatus.Cancelled,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie(userId))
    .send({
      orderId: order.id,
      token: "asdlkfj",
    })
    .expect(404);
});
it("returns a 201 with valid inputs", async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const price = Math.floor(Math.random() * 100000);
  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    userId,
    price,
    status: OrderStatus.Created,
  });
  await order.save();
  const response = await request(app)
    .post("/api/payments")
    .set("Cookie", getAuthCookie(userId))
    .send({
      token: "tok_mastercard",
      orderId: order.id,
    });
  expect(response.status).toEqual(201);

  // const stripeObj = getStripe();
  // const stripeCharges = await stripeObj.charges.list({ limit: 50 });
  // const stripeCharge = stripeCharges.data.find((charge) => {
  //   return charge.amount === price;
  // });

  // expect(stripeCharge).toBeDefined();
  // expect(stripeCharge!.currency).toEqual("usd");

  // const payment = await Payment.findOne({
  //   orderId: order.id,
  //   stripeId: stripeCharge!.id,
  // });
  // expect(payment).not.toBeNull();
});
