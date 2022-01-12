import React, { Fragment, useState } from "react";
import { AppProps } from "next/app";
import MyForm from "../../components/MyForm";
import { sign } from "crypto";

const signin = () => {
  return (
    <Fragment>
      <div className="container" style={{ marginTop: "5rem" }}>
        <MyForm mode="signin"></MyForm>
      </div>
    </Fragment>
  );
};

export default signin;
