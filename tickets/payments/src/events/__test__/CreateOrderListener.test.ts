import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Subjects, OrderStatus, OrderCreatedEvent } from "@scope/common";
import { natsWrapper } from "../../NatsWrapper";
import { CreateOrderListener } from "../CreateOrderListener";
import { Order } from "../../models/Orders";

const setup = async () => {
    const listener = new CreateOrderListener(natsWrapper.client);
  
    const data: OrderCreatedEvent['data'] = {
      id: mongoose.Types.ObjectId().toHexString(),
      version: 0,
      expiresAt: 'alskdjf',
      userId: 'alskdjf',
      status: OrderStatus.Created,
      ticket: {
        id: 'alskdfj',
        price: 10,
      },
    };
  
    // @ts-ignore
    const msg: Message = {
      ack: jest.fn(),
    };
  
    return { listener, data, msg };
  };
  
  it('replicates the order info', async () => {
    const { listener, data, msg } = await setup();
  
    await listener.onMessage(data, msg);
  
    const order = await Order.findById(data.id);
  
    expect(order!.price).toEqual(data.ticket.price);
  });
  
  it('acks the message', async () => {
    const { listener, data, msg } = await setup();
  
    await listener.onMessage(data, msg);
  
    expect(msg.ack).toHaveBeenCalled();
  });