
const https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import {exec} from 'child_process';
const LCUProcessDetails = (query:string, callback: any): any => {
  const platform = process.platform;
  let cmd:string = '';
  switch(platform){
    case 'win32' : cmd = 'wmic PROCESS WHERE NAME="LeagueClientUx.exe"'; break;
    case 'darwin' : cmd = 'ps -ax | grep ${query}'; break;
    case 'linux' : cmd = 'ps -A | grep ${query}'; break;
    default: break;
  }

  let port_regex = /--app-port=([0-9]*)/;
  let token_regex = /--remoting-auth-token=([\w-]*)/;

  exec(cmd, (err, stdout, stderr) => {
    const port_match = stdout.match(port_regex);
    const token_match = stdout.match(token_regex);
    let port;
    let token;
    if(port_match && token_match){
      port = port_match[0].split("=")[1];
      token = token_match[0].split("=")[1];
    }
    const options = {
      hostname: "127.0.0.1",
      port: port,
      path: "/lol-summoner/v1/current-summoner",
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + Buffer.from('riot:'+token).toString('base64')
      }
    }
    const req = https.request(options, (res: any) => {
      console.log('statusCode:', res.statusCode);
      console.log('headers:', res.headers);

      res.on('data', (d: any) => {
        process.stdout.write(d);
      });
    });

    req.on('error', (e: any) => {
      console.error(e);
    });

    callback("Connection to LCU Established");
  })
}

LCUProcessDetails('LeagueClientUx.exe', (status: any) => {
  console.log(status);
});

