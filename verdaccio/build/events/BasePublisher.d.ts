import { Stan } from "node-nats-streaming";
import { Event } from "./EventTypes";
export declare abstract class Publisher<T extends Event> {
    abstract subject: T["subject"];
    protected client: Stan;
    constructor(client: Stan);
    publish(data: T["data"]): Promise<void>;
}
