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
  const OrderList = orders.map((order) => {
    return (
      <tr key={order.id as string}>
        <td>{order.ticket.title}</td>
        <td>{order.ticket.price}</td>
        <td>
          <Order order={order}></Order>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h2>Orders</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Ticket</th>
            <th>Price</th>
            <th>Time Left</th>
          </tr>
        </thead>
        <tbody>{OrderList}</tbody>
      </table>
    </div>
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
