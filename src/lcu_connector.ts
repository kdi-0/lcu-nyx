import { LCUDetails, LCUHeader, lcu_details } from "./authenticator";
import { EventEmitter } from "stream";
import WebSocket from "ws";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
lcu_details()
  .then((data: LCUDetails) => {
    const options: LCUHeader = {
      hostname: "127.0.0.1",
      port: data.port,
      path: "",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Basic " + Buffer.from("riot:" + data.token).toString("base64"),
      },
    };
    const url: string = "wss://riot:" + data.token + "@127.0.0.1:" + data.port;
    const ws = new WebSocket(url, "wamp");
    ws.on("open", () => {
      ws.send('[5, "OnJsonApiEvent"]');
    });
  })
  .catch((e: any) => {
    console.log(e);
  });

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
