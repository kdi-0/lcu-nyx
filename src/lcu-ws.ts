import https from "https";
import WebSocket, { ClientOptions } from "ws";
import { LCUDetails } from "./authenticator";

export interface EventResponse<T = any> {
  uri: string;
  data: T;
}

export type EventCallback<T = any> = (
  data: T | null,
  event: EventResponse<T>
) => void;

export class LCU extends WebSocket {
  subscriptions: Map<string, EventCallback[]> = new Map();
  constructor(url: string, options: any) {
    super(url, options);
    this.on("open", () => {
      this.send(JSON.stringify([5, "OnJsonApiEvent"]));
    });
  }
}
