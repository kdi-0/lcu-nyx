import { lcu_details } from "./authenticator";
import { LCUDetails, LCUHeader } from "./lcu_types";
import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const LCU_ENDPOINTS = {
  current_summoner: "/lol-summoner/v1/current-summoner",
  ranked_stats: "/lol-ranked/v1/current-ranked-stats",
};

function create_lcu_header(path: string, auth: LCUDetails): any {
  return {
    hostname: "127.0.0.1",
    port: auth.port,
    path: path,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization:
        "Basic " + Buffer.from("riot:" + auth.token).toString("base64"),
    },
  };
}

export function make_request(endpoint: string) {
  lcu_details().then((data) => {
    https
      .get(create_lcu_header(endpoint, data), (res) => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);

        res.on("data", (d) => {
          process.stdout.write(d);
        });
      })
      .on("error", (e) => {
        console.error(e);
      });
  });
}
