import { connect, NatsConnectionOptions, SubscriptionOptions } from "ts-nats";
async function main() {
  console.log("starting");
  let opts = {} as NatsConnectionOptions;
  opts.url = "http://172.17.0.4:32452";

  let nc = await connect(opts);
  nc.on("connect", () => {
    console.log("sub connected to nats");
  });
  const subscription = await nc.subscribe("ticket:created", (err, msg) => {
    console.log("message incoming");
  });
}
main();
