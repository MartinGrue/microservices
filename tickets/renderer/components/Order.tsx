import { useEffect } from "react";
import { IOrder } from "../app/models/Order";
import { useTimeLeft } from "../pages/hooks/timeleft";

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
    <li >
      {order.ticket.title} - {order.status} - {timeLeft}
    </li>
  );
};
export default Order;
