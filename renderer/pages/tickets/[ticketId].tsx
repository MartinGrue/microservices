import { currentUser } from "@scope/common";
import axios from "axios";
import { NextPage } from "next";
import Router from "next/router";
import { ITicket } from "../../app/models/Ticket";
import { UpdateTicketForm } from "../../components/UpdateTicketForm";
import { Context, InjectionProps } from "../_app";

interface PageProps extends InjectionProps {
  ticket: ITicket;
}
const TicketShow: NextPage<PageProps> = ({ ticket, agent }) => {
  const createOrder = async () => {
    // console.log(ticket.id);
    const res = await axios.post(`/api/orders`, { ticketId: ticket.id });
    // const order = await agent.Order.createNewOrder(ticket.id);
    const order = res.data;
    Router.push("/orders/[orderId]", `/orders/${order.id}`);
  };

  return (
    <div>
      <div className="row" style={{ margin: "40px 0" }}>
        <div className="col-lg-6">
          <h1>{ticket.title}</h1>
          <h4>Price: {ticket.price}</h4>
          {/* {errors} */}
          {ticket.orderId ? (
            <button type="button" className="btn btn-secondary btn-lg" disabled>
              Not available
            </button>
          ) : (
            <button onClick={() => createOrder()} className="btn btn-primary">
              Purchase
            </button>
          )}
        </div>

        <div className="col-lg-6">
          {/* {currentUser.currentUser !== null ? (
            ticket.userId === currentUser.currentUser.userId && (
              <UpdateTicketForm
                ticketId={ticket.id}
                agent={agent}
              ></UpdateTicketForm>
              
            )
          ) : (
            <div></div>
          )} */}
        </div>
      </div>
    </div>
  );
};

TicketShow.getInitialProps = async (context: Context): Promise<PageProps> => {
  try {
    console.log("in ticket init");
    const { ticketId } = context.query;
    const { req, agent } = context;
    const ticket = await agent.Ticket.getTicket(ticketId);
    console.log("ticket in ticket init: ", ticket);
    return {  agent, ticket };
  } catch (error) {
    console.log(error);
    return {  agent: undefined, ticket: undefined };
  }
};

export default TicketShow;
