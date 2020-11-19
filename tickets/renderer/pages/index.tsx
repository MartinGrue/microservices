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
interface Props {
  currentUser: ICurrentUser;
}

const index: NextPage<Props> = ({ currentUser }) => {
  return (
    <div>
      {currentUser.currentUser ? (
        <h1>You are signed in</h1>
      ) : (
        <h1>You are signed out</h1>
      )}
      <button
        type="submit"
        className="btn btn-primary"
        onClick={(e) => {
          Router.push("/auth/signup");
        }}
      >
        Go to signup
      </button>
    </div>
  );
};
interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
  agent: Agent;
}

index.getInitialProps = async (ctx: Context): Promise<Props> => {
  console.log("this is color form common module in index page: ", color);
  console.log('\x1b[36m%s\x1b[0m', 'I am cyan');
  const { req, agent } = ctx;

  try {
    const currentUser = await agent.User.fetchCurrentUser();
    console.log("currentUser is: ",currentUser);
    return { currentUser };
  } catch (error) {
    const currentUser = await Promise.resolve<ICurrentUser>({
      currentUser: null,
    });

    return {
      currentUser,
    };
  }
};
export default index;
