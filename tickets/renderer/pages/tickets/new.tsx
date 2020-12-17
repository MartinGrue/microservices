import { useState } from "react";
import Router from "next/router";
import { Context, InjectionProps } from "../_app";
import { NextPage } from "next";
interface PageProps extends InjectionProps {}
const NewTicket: NextPage<PageProps> = ({ agent }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>();
  const createNewTicket = async () => {
    try {
      const newTicket = await agent.Ticket.createNewTicket({ title, price });
      console.log(newTicket);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();

    createNewTicket();
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
      <h1>Create a Ticket</h1>
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
            // value={price}
            onChange={(e) => parsePrice(e.target.value)}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
NewTicket.getInitialProps = async (context: Context): Promise<PageProps> => {
  try {
    console.log("in new ticket init");
    const { req, agent, currentUser } = context;

    return { currentUser, agent };
  } catch (error) {
    console.log(error);
    return { currentUser: undefined, agent: undefined };
  }
};
export default NewTicket;
