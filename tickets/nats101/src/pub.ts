import { connect, NatsConnectionOptions, Payload } from "ts-nats";

async function main() {
  console.log("starting");
  let opts = {} as NatsConnectionOptions;
  opts.url = "http://172.17.0.4:32452";
  try {
    let nc = await connect(opts);
    // Do something with the connection
    nc.on("permissionError", (err) => {
      console.log(`${err}`);
    });
    nc.on("connect", () => {
      console.log("connected to nats");
      const data = { id: "1", title: "sometile", price: "20" };
      const payload = JSON.stringify(data);
      nc.publish("ticket:created", payload);
    });
  } catch (error) {
    // handle the error
    console.log(error);
  }
}
main();
