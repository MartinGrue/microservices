import { useEffect } from "react";
import { IOrder } from "../app/models/Order";
import { useTimeLeft } from "../app/hooks/timeleft";
import { OrderStatus } from "@scope/common";

interface Props {
  order: IOrder;
}
const Order: React.FC<Props> = ({ order }) => {
  const { timeLeft, findTimeLeft } = useTimeLeft(order);

  useEffect(() => {
    const timerId = setInterval(findTimeLeft, 1000);
    console.log(timeLeft);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);
  return (
    <div>
      {order.status === OrderStatus.Cancelled
        ? "cancelled"
        : timeLeft < 0
        ? "timed out"
        : `${timeLeft} ms`}
    </div>
  );
};
export default Order;
