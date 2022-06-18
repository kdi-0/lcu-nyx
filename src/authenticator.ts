import util from "node:util";
import { LCUDetails } from "./lcu_types";
const exec = util.promisify(require("node:child_process").exec);

export async function lcu_details(): Promise<LCUDetails> {
  let cmd: string = retrieve_platform_command("LeagueClientUx");
  const port_regex = /--app-port=([0-9]*)/;
  const token_regex = /--remoting-auth-token=([\w-]*)/;
  let lcu_details: LCUDetails = {};
  try {
    const { stdout } = await exec(cmd);
    const port_match = stdout.match(port_regex);
    const token_match = stdout.match(token_regex);
    if (port_match && token_match) {
      lcu_details.running = true;
      lcu_details.port = port_match[0].split("=")[1];
      lcu_details.token = token_match[0].split("=")[1];
    } else {
      lcu_details.running = false;
    }
  } catch (e) {
    console.error(e);
  }
  return lcu_details;
}

function retrieve_platform_command(process_name: string): string {
  const platform: string = process.platform;
  switch (platform) {
    case "win32":
      return 'wmic PROCESS WHERE NAME="LeagueClientUx.exe"';
    case "darwin":
      return "ps -ax | grep " + process_name;
    default:
      return "ps aux | grep " + process_name;
  }
}
