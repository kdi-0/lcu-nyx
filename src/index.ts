import express from 'express';
import * as dotenv from 'dotenv';
import https from 'https';
import {exec} from 'child_process';

dotenv.config()
const app = express();

const base_url:string = "na1.api.riotgames.com";
const championv3 = "/lol/platform/v3/champion-rotations";
const summonerv4 = "/lol/summoner/v4/summoners/by-name/Sanchovies"



const options = {
    hostname: base_url,
    path: summonerv4,
    method: 'GET',
    headers: {
        "X-Riot-Token": process.env.API_Key
    }
}

// const req = https.request(options, (res) => {
//   console.log('statusCode:', res.statusCode);
//   console.log('headers:', res.headers);

//   res.on('data', (d) => {
//     process.stdout.write(d);
//   });
// });

// req.on('error', (e) => {
//   console.error(e);
// });
