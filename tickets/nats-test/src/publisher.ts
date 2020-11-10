import nats from "node-nats-streaming";
import CreateTicketPublisher from "./events/CreateTicketPublisher";
console.clear();

const stan = nats.connect("ticketing", "abc", {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher connected to NATS");

  const publisher = new CreateTicketPublisher(stan);
  try {
    await publisher.publish({
      id: "123",
      title: "concert",
      price: 20,
      userId: "1234",
      version: 1,
    });
  } catch (err) {
    console.error(err);
  }

  // const data = JSON.stringify({
  //   id: '123',
  //   title: 'concert',
  //   price: '$20',
  // });

  // stan.publish('TicketCreated', data, () => {
  //   console.log('Event published');
  // });
});
