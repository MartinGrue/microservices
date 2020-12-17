import React from "react";
import { NextPage, NextPageContext, NextComponentType } from "next";
import axios from "axios";
import Router from "next/router";
import {
  createAxiosInstance,
  createAgent,
  Agent,
} from "../app/api/createCustomAxios";
import { ICurrentUser } from "../app/models/User";
import color from "@scope/common";
import { Context, InjectionProps } from "./_app";
import { ITicket } from "../app/models/Ticket";
import Link from "next/link";
interface PageProps extends InjectionProps {
  tickets: ITicket[];
}

const index: NextPage<PageProps> = ({ currentUser, tickets }) => {
  // console.log(tickets);
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.title}>
        <td>{ticket.title}</td>
        <td>{ticket.price}</td>
        <td>
          <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`}>
            <a>View</a>
          </Link>
        </td>
      </tr>
    );
  });
  return (
    <div>
      <h2>Tickets</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

index.getInitialProps = async (ctx: Context): Promise<PageProps> => {
  try {
    console.log("\x1b[36m%s\x1b[0m", "I am cyan");
    const { req, agent, currentUser } = ctx;
    const tickets = await agent.Ticket.getAllTickets();
    // console.log(tickets);
    return { currentUser, agent, tickets };
  } catch (error) {
    const currentUser = await Promise.resolve<ICurrentUser>({
      currentUser: null,
    });

    return { currentUser, agent: undefined, tickets: [] };
  }
};
export default index;
