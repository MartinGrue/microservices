import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { IOrder } from "../../app/models/Order";
import { ITicket } from "../../app/models/Ticket";
import { useTimeLeft } from "../../app/hooks/timeleft";
import { Context, InjectionProps } from "../_app";
import Order from "../../components/Order";
import { OrderStatus } from "@scope/common";
interface PageProps extends InjectionProps {
  orders: IOrder[];
}
const OrderIndex: NextPage<PageProps> = ({ orders, agent }) => {
  const [ordersState, setordersState] = useState<IOrder[]>(orders);

  const deleteOrder = async (orderToDelete: IOrder) => {
    try {
      await agent.Order.deleteOrder(orderToDelete.id);
      const newOrders = ordersState.reduce((acc, val) => {
        if (val.id === orderToDelete.id) {
          val.status = OrderStatus.Cancelled;
        }
        return [...acc, val];
      }, [] as IOrder[]);
      setordersState(newOrders);
    } catch (error) {}
  };
  const OrderList = ordersState.map((order) => {
    return (
      <tr key={order.id as string}>
        <td>{order.ticket.title}</td>
        <td>{order.ticket.price}</td>
        <td>
          <Order order={order}></Order>
        </td>
        <td>
          {order.status === OrderStatus.Cancelled ? (
            <button type="button" className="btn btn-secondary btn-lg" disabled>
              Already cancelled
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-danger"
              onClick={(e) => deleteOrder(order)}
            >
              Delete
            </button>
          )}
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h2>Orders</h2>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Ticket</th>
            <th>Price</th>
            <th>Time Left</th>
            <th></th>
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
