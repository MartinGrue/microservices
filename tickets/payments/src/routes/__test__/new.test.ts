import mongoose from "mongoose";
import request from "supertest";
import { OrderStatus } from "@scope/common";
import { app } from "../../app";
import { getAuthCookie } from "../../test/helpers";

import { Order } from "../../models/Orders";
import { Payment } from "../../models/Payments";

it("returns a 404 when purchasing an order that does not exist", async () => {});
it("returns a 401 when purchasing an order that doesnt belong to the user", async () => {});
it("returns a 400 when purchasing a cancelled order", async () => {});
it("returns a 201 with valid inputs", async () => {});
