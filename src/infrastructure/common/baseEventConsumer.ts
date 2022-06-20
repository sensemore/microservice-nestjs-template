import stack from "callsite";
import { v4 } from "uuid";
import { Binding, Connection, Exchange, Message, Queue } from "amqp-ts";

import { BaseEvent, Payload } from "./baseEvent";

export abstract class BaseEventConsumer {
  constructor(private connection: Connection, private eventName: string) {
    this.register();
  }
  abstract handle(payload: string);
  abstract consumerName(): string;

  log(message: string) {
    let file = stack()[1].getFileName();
    let lineno = stack()[1].getLineNumber();
    let timestamp = new Date().toUTCString();
    console.log(`${timestamp} [log] in ${file}:${lineno} ${message}`);
  }

  async register() {
    const exchange = await this.connection.declareExchange(
      this.eventName,
      "fanout"
    );
    const queue = await this.connection.declareQueue(this.consumerName(), {
      durable: true,
    });
    //create unqiue queue for event and delete it self after connection is dropped
    queue.bind(exchange);
    queue.activateConsumer(async (msg: Message) => {
      if (msg !== null) {
        try {
          console.log(" [x] Event Recieved consumer:%s", this.consumerName());

          let payload = msg.content.toString();
          await this.handle(payload);
          console.log(" [x] Event  Handled consumer:%s", this.consumerName());
        } catch (e) {
          //todo error policy
        } finally {
          msg.ack();
        }
      }
    });
    console.log(this.consumerName + " registered");
  }
}
