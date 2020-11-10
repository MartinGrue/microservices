import nats from "node-nats-streaming";
import CreateTicketListerner from "./events/CreateTicketListerner";
import UpdateTicketListener from "./events/UpdateTicketListener";

console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Listener connected to NATS");
  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });
  new CreateTicketListerner(stan).listen();
  new UpdateTicketListener(stan).listen();

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '$20',
  // });

  // stan.publish('TicketCreated', data, () => {
  //   console.log('Event published');
  // });
});
