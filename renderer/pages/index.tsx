import React, { useEffect } from "react";
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

const index: NextPage<PageProps> = ({ tickets }) => {
  // console.log(tickets);\
  useEffect(() => {
    console.log("tickets: ");
    // console.log("\x1b[35m%s\x1b[0m", "I am useEffect");
  }, []);
  const ticketList = tickets.map((ticket) => {
    return (
      <tr key={ticket.id as string}>
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
    // console.log("\x1b[36m%s\x1b[0m", "I am cyan");
    const { agent } = ctx;
    const tickets = await agent.Ticket.getAllTickets();
    console.log("tickets: ", tickets);
    console.log("hi:");

    return { agent, tickets };
    return { agent: undefined, tickets: [] };
  } catch (error) {
    return { agent: undefined, tickets: [] };
  }
};
export default index;
