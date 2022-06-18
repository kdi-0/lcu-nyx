import WebSocket, { ClientOptions } from "ws";

const MESSAGE_TYPES = {
  WELCOME: 0,
  PREFIX: 1,
  CALL: 2,
  CALLRESULT: 3,
  CALLERROR: 4,
  SUBSCRIBE: 5,
  UNSUBSCRIBE: 6,
  PUBLISH: 7,
  EVENT: 8,
};

export class LCU_Websocket extends WebSocket {
  constructor(url: string, options: any) {
    super(url, options);
    this.on("open", () => {
      this.send(JSON.stringify([MESSAGE_TYPES.SUBSCRIBE, "OnJsonApiEvent"]));
    });
  }
}
