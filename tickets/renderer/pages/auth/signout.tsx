import React, { useEffect } from "react";
import axios from "axios";
import Router from "next/router";

const signout: React.FC = () => {
  const signoutUser = async () => {
    try {
      const response = await axios.post(`/api/users/signout`);
      Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    signoutUser();
  }, []);
  return <div></div>;
};

export default signout;
