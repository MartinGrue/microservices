import {
  connect,
  NatsConnectionOptions,
  SubscriptionOptions,
  Msg,
} from "ts-nats";
import nats from "node-nats-streaming"
async function main() {
  console.log("starting");
  let opts = {} as NatsConnectionOptions;
  opts.url = "http://172.17.0.4:32452";
  opts;

  let nc = await connect(opts);
  nc.on("connect", () => {
    console.log("sub connected to nats");
  });
  let subOpts = {} as SubscriptionOptions;
  subOpts.queue = "listenerQueueGroup";
  const subscription = await nc.subscribe(
    "ticket:created",
    (err, msg: Msg) => {
      console.log(msg.subject);
      console.log(msg.data);
      console.log("message incoming");
    },
    subOpts
  );
}
main();
