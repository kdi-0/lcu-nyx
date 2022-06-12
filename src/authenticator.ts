import {exec} from 'child_process';
import {log} from 'console';

export interface LCUDetails {
	port?: string 
	token?: string
}

export interface LCUHeader {
	hostname: string
} 

export function lcu_details():LCUDetails{
  const platform:string = process.platform;
	const process_name = 'LeagueClientUx.exe';
  let cmd:string = '';
  switch(platform){
    case 'win32' : cmd = 'wmic PROCESS WHERE NAME="LeagueClientUx.exe"'; break;
    case 'darwin' : cmd = 'ps -ax | grep ' + process_name; break;
    case 'linux' : cmd = 'ps -A | grep ' + process_name; break;
    default: break;
  }
  const port_regex = /--app-port=([0-9]*)/;
  const token_regex = /--remoting-auth-token=([\w-]*)/;
	let lcu_details:LCUDetails = {};
  exec(cmd, (err, stdout, stderr) => {
		if(err){
			console.error(`exec error: ${err}`);
		}
    const port_match = stdout.match(port_regex);
    const token_match = stdout.match(token_regex);
    if(port_match && token_match){
      lcu_details.port = port_match[0].split("=")[1];
      lcu_details.token = token_match[0].split("=")[1];
    }
		console.log(stdout);
		console.log(stderr);
	});
	return lcu_details;
}
