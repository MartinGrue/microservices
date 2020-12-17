import { time } from "console";
import { useState } from "react";
import { IOrder } from "../models/Order";

const useTimeLeft = (order: IOrder) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const findTimeLeft = () => {
    const oderDate = new Date(order.expiresAt);
    const msLeft = Math.abs(oderDate.getTime() - new Date().getTime());
    setTimeLeft(Math.round(msLeft / 1000));
  };
  return { timeLeft, findTimeLeft };
};
export { useTimeLeft };
