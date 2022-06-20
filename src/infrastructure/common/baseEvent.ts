import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { Connection, Message } from "amqp-ts";

export abstract class Payload {}

export class BaseEvent<P extends Payload> {
  constructor(private eventName: string) {}
  getEventName(): string {
    return this.eventName;
  }

  parseMessage(payload: string): P {
    let parsed = JSON.parse(payload);
    return parsed as P;
  }

  async publish(amqpConnection: AmqpConnection, payload: P) {
    amqpConnection.publish(this.eventName, "", payload);
    // const exchange = await this.connection.declareExchange(eventName, 'fanout');
    // const message = new Message(JSON.stringify(data));
    // exchange.send(message);
  }
}
