"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTicketPublisher = void 0;
const BasePublisher_1 = require("./BasePublisher");
const Subjects_1 = require("./Subjects");
class UpdateTicketPublisher extends BasePublisher_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = Subjects_1.Subjects.TicketUpdated;
        this.queueGroupName = "test";
    }
}
exports.UpdateTicketPublisher = UpdateTicketPublisher;
