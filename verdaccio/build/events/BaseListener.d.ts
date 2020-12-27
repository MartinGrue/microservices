import { Message, Stan } from "node-nats-streaming";
import { Event } from "./EventTypes";
export declare abstract class Listener<T extends Event> {
    abstract subject: T["subject"];
    abstract onMessage(data: T["data"], msg: Message): void;
    protected client: Stan;
    protected ackWait: number;
    abstract queueGroupName: string;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): any;
}
