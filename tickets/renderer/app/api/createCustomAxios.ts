import axios, { AxiosInstance, AxiosResponse } from "axios";
import { ICurrentUser } from "../models/User";
import { NextPageContext } from "next";
import { IncomingMessage } from "http";
import { ITicket } from "../models/Ticket";
import { IOrder } from "../models/Order";
export interface Agent {
  axiosInstance: AxiosInstance;
  User: {
    fetchCurrentUser: () => Promise<ICurrentUser>;
    // signIn: (user: IUserRequest) => Promise<IUser>;
  };
  Ticket: {
    getAllTickets: () => Promise<ITicket[]>;
    getTicket: (id: string | string[]) => Promise<ITicket>;
  };
  Order: {
    createNewOrder: (tickerId: string | string[]) => Promise<IOrder>;
  };
}
export const createAxiosInstance = (req: IncomingMessage): AxiosInstance => {
  if (typeof window === "undefined") {
    console.log("window is undefined");
    const axiosInstance = axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
    return axiosInstance;
  }
  const axiosInstance = axios.create({
    baseURL: "/",
  });
  return axiosInstance;
};

export const createAgent = (axiosInstance: AxiosInstance): Agent => {
  const responseBody = (response: AxiosResponse) => response.data;

  const requests = {
    get: (url: string, params?: {}) =>
      axiosInstance.get(url, params).then(responseBody),
    post: (url: string, body: {}) =>
      axiosInstance.post(url, body).then(responseBody),
    put: (url: string, body: {}) =>
      axiosInstance.put(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
  };
  const User = {
    // fetchUser: (): Promise<IUser[]> => requests.get(`/users`),
    // signIn: (user: IUserRequest): Promise<IUser> =>
    //   requests.post(`/auth/signin`, user),
    fetchCurrentUser: (): Promise<ICurrentUser> =>
      requests.get("/api/users/currentuser"),
  };
  const Ticket = {
    getAllTickets: (): Promise<ITicket[]> => requests.get("/api/tickets"),
    getTicket: (id: string | string[]): Promise<ITicket> =>
      requests.get(`/api/tickets/${id}`),
  };
  const Order = {
    createNewOrder: (ticketId: string | string[]): Promise<IOrder> =>
      requests.post(`/api/orders`, {ticketId}),
  };
  return { axiosInstance, User, Ticket, Order };
};
