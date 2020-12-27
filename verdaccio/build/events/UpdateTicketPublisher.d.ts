import { Publisher } from "./BasePublisher";
import { TicketUpdatedEvent } from "./EventTypes";
import { Subjects } from "./Subjects";
export declare class UpdateTicketPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated;
    queueGroupName: string;
}
