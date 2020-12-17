import { NextPage } from "next";
import React, { useEffect } from "react";
import { IOrder } from "../../app/models/Order";
import { ITicket } from "../../app/models/Ticket";
import { useTimeLeft } from "../../app/hooks/timeleft";
import { Context, InjectionProps } from "../_app";
import Order from "../../components/Order";
interface PageProps extends InjectionProps {
  orders: IOrder[];
}
const OrderIndex: NextPage<PageProps> = ({ orders }) => {
  return (
    <ul>
      {orders.map((order) => {
        return <Order order={order} key={order.id as string}></Order>;
      })}
    </ul>
  );
};

OrderIndex.getInitialProps = async (context: Context): Promise<PageProps> => {
  try {
    console.log("in orders index init");
    const { req, agent, currentUser } = context;
    const orders = await agent.Order.getAll();
    return { currentUser, agent, orders };
  } catch (error) {
    console.log(error);
    return { currentUser: undefined, agent: undefined, orders: undefined };
  }
};

export default OrderIndex;
