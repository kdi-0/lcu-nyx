"use strict";
exports.__esModule = true;
var https = require('https');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var child_process_1 = require("child_process");
var LCUProcessDetails = function (query, callback) {
    var platform = process.platform;
    var cmd = '';
    switch (platform) {
        case 'win32':
            cmd = 'wmic PROCESS WHERE NAME="LeagueClientUx.exe"';
            break;
        case 'darwin':
            cmd = 'ps -ax | grep ${query}';
            break;
        case 'linux':
            cmd = 'ps -A | grep ${query}';
            break;
        default: break;
    }
    var port_regex = /--app-port=([0-9]*)/;
    var token_regex = /--remoting-auth-token=([\w-]*)/;
    (0, child_process_1.exec)(cmd, function (err, stdout, stderr) {
        var port_match = stdout.match(port_regex);
        var token_match = stdout.match(token_regex);
        var port;
        var token;
        if (port_match && token_match) {
            port = port_match[0].split("=")[1];
            token = token_match[0].split("=")[1];
        }
        var options = {
            hostname: "127.0.0.1",
            port: port,
            path: "/lol-summoner/v1/current-summoner",
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + Buffer.from('riot:' + token).toString('base64')
            }
        };
        var req = https.request(options, function (res) {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            res.on('data', function (d) {
                process.stdout.write(d);
            });
        });
        req.on('error', function (e) {
            console.error(e);
        });
        callback("Connection to LCU Established");
    });
};
LCUProcessDetails('LeagueClientUx.exe', function (status) {
    console.log(status);
});
