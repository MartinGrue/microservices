import React, { Fragment, useState, useEffect } from "react";
import { AppProps } from "next/app";
import axios from "axios";
import Router from "next/router";
import { Agent } from "../app/api/createCustomAxios";
interface UpdateTicketFormProps {
  ticketId: string | string[];
  agent: Agent;
}
export const UpdateTicketForm: React.FC<UpdateTicketFormProps> = ({
  ticketId,
  agent,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const updateTicket = async () => {
    try {
      const ticket = axios.put(`/api/tickets/${ticketId}`, {
        title,
        price,
      });
      // const ticket = await agent.Ticket.updateTicket(ticketId, {
      //   title,
      //   price,
      // });
      console.log(ticket);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    axios.get(`/api/tickets/${ticketId}`).then((res) => {
      setTitle(res.data.title);
      parsePrice(res.data.price);
    });
    // agent.Ticket.getTicket(ticketId).then((ticket) => {
    //   setTitle(ticket.title);
    //   setPrice(ticket.price);
    // });
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    updateTicket();
  };
  const parsePrice = (val: string) => {
    const floatPrice = parseFloat(val);
    if (isNaN(floatPrice)) {
      return;
    }
    setPrice(floatPrice);
  };
  return (
    <div>
      <div>
        <h1>Update a Ticket</h1>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              value={price}
              onChange={(e) => parsePrice(e.target.value)}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};
