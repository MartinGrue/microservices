import React, { Fragment, useState } from "react";
import { AppProps } from "next/app";
import axios from "axios";
import Router from "next/router";
function MyForm() {
  const [email, emailsetstate] = useState("");
  const [password, passwordsetstate] = useState("");
  const [errors, seterrors] = useState<any[] | undefined>(undefined);

  const setEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    emailsetstate(e.currentTarget.value);
  };

  const setPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    passwordsetstate(e.currentTarget.value);
  };
  const onSubmit = async (e: any) => {
    console.log("email: ", email, "password: ", password);
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(response.data);
      Router.push("/");
    } catch (error) {
      seterrors(error.response.data.errors);
    }
  };
  return (
    <div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e);
            }}
            className="form-control"
            placeholder="Email"
          ></input>
        </div>
      </div>
      <div className="form-group row">
        <label className="col-sm-2 col-form-label">Password</label>
        <div className="col-sm-10">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e);
            }}
            type="password"
            className="form-control"
            placeholder="Password"
          ></input>
        </div>
      </div>
      {errors && (
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          <ul className="my-0">
            {errors.map((error) => {
              return <li key={error.message}>{error.message}</li>;
            })}
          </ul>
        </div>
      )}

      <div className="form-group row">
        <div className="col-sm-10">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => onSubmit(e)}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyForm;
