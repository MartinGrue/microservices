import React from "react";
import { NextPage, NextPageContext, NextComponentType } from "next";
import axios from "axios";
import Router from "next/router";
import { createAxiosInstance, createAgent } from "../app/api/createCustomAxios";
import { ICurrentUser } from "../app/models/User";

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
index.getInitialProps = async ({ req }: NextPageContext): Promise<Props> => {
  console.log("loading in index");

  const axiosInstance = createAxiosInstance(req);
  const agent = createAgent(axiosInstance);
  try {
    const currentUser = await agent.User.fetchCurrentUser();

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
