import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import Router from "next/router";
import { NextPage } from "next";
import { Context, InjectionProps } from "../_app";
import { IOrder } from "../../app/models/Order";
import { useTimeLeft } from "../../app/hooks/timeleft";

interface PageProps extends InjectionProps {
  order: IOrder;
}
const OrderShow: NextPage<PageProps> = ({ order, currentUser }) => {
  const { timeLeft, findTimeLeft } = useTimeLeft(order);

  useEffect(() => {
    const timerId = setInterval(findTimeLeft, 1000);
    console.log(timeLeft);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      Time left to pay: {timeLeft} seconds
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

    const { req, agent, currentUser } = context;
    const order = await agent.Order.getOrder(orderId);
    console.log("order: ", order);
    return { currentUser, agent: agent, order };
  } catch (error) {
    return { currentUser: undefined, agent: undefined, order: undefined };
  }
};
export default OrderShow;
