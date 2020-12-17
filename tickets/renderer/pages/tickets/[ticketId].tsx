import { NextPage } from "next";
import Router from "next/router";
import { ITicket } from "../../app/models/Ticket";
import { Context, InjectionProps } from "../_app";

interface PageProps extends InjectionProps {
  ticket: ITicket;
}
const TicketShow: NextPage<PageProps> = ({ ticket, agent }) => {
  const createOrder = async () => {
    console.log(ticket.id);
    const order = await agent.Order.createNewOrder(ticket.id);
    Router.push("/orders/[orderId]", `/orders/${order.id}`);
  };

  return (
    <div>
      <h1>{ticket.title}</h1>
      <h4>Price: {ticket.price}</h4>
      {/* {errors} */}
      <button onClick={() => createOrder()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

TicketShow.getInitialProps = async (context: Context): Promise<PageProps> => {
  try {
    console.log("in ticket init");

    const { ticketId } = context.query;
    const { req, agent, currentUser } = context;
    const ticket = await agent.Ticket.getTicket(ticketId);
    console.log("ticket: ", ticket);

    return { currentUser, agent: agent, ticket };
  } catch (error) {
    console.log(error);
    return { currentUser: undefined, agent: undefined, ticket: undefined };
  }
};

export default TicketShow;
