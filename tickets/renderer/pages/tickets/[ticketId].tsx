import { NextPage } from "next";
import Router from "next/router";
import { ITicket } from "../../app/models/Ticket";
import { Context, InjectionProps } from "../_app";

interface PageProps extends InjectionProps {
  ticket: ITicket;
}
const TicketShow: NextPage<PageProps> = ({ ticket }) => {
  const createOrder = () => {};

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
    const { ticketId } = context.query;
    const { req, agent, currentUser } = context;
    const ticket = await agent.Ticket.getTicket(ticketId);
    return { currentUser, agent: agent, ticket };
  } catch (error) {
    return { currentUser: undefined, agent: undefined, ticket: undefined };
  }
};

export default TicketShow;