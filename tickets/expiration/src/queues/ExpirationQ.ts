import Queue from "bull";
import { ExpirationCompletePublisher } from "../events/ExpirationCompletePurblisher";
import { natsWrapper } from "../NatsWrapper";
interface Payload {
  orderId: string;
}
const expirationQ = new Queue<Payload>("order:expiration", {
  redis: {
    host: process.env.REDIS_HOST,
  },
});

expirationQ.process(async (job) => {
  new ExpirationCompletePublisher(natsWrapper.client).publish({
    orderId: job.data.orderId,
  });
});
export { expirationQ, Payload };
