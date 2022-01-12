import { useEffect, useState } from "react";
// import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import { NextPage } from "next";
import { Context, InjectionProps } from "../_app";
import { IOrder } from "../../app/models/Order";
import { useTimeLeft } from "../../app/hooks/timeleft";
import Order from "../../components/Order";

interface PageProps extends InjectionProps {
  order: IOrder;
}
const OrderShow: NextPage<PageProps> = ({ order}) => {

  return (
    <div>
      <h1>{`Ticket: ${order.ticket.title}`}</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h1 style={{ paddingRight: "30px" }}> Time left to pay: </h1>
        <h1>
          <Order order={order}></Order>
        </h1>
      </div>

      {/* <StripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey="pk_test_FlLFVapGHTly3FicMdTU06SC006tWtWbNH"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      /> */}
      <p>Strike Checkout here</p>
    </div>
  );
};
OrderShow.getInitialProps = async (context: Context): Promise<PageProps> => {
  try {
    console.log("in order init");
    const { orderId } = context.query;
    console.log("ticketId", orderId);

    const { req, agent} = context;
    const order = await agent.Order.getOrder(orderId);
    console.log("order: ", order);
    return { agent: agent, order };
  } catch (error) {
    return { agent: undefined, order: undefined };
  }
};
export default OrderShow;
