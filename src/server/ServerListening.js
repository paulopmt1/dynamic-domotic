var serverPort = 1010;
var serverIP = "192.168.5.104";
var http = require('http');

var formidable = require('formidable'),
    util = require('util');
    
ServerActions = require('./ServerActions');
SensorActions = require('./SensorActions');


// ###############          TCP         ###################
http.createServer(function (req, res) {
    switch (req.url){
        case '/setSensorData':
            SensorActions.setSensorData(req, res);
            break;

        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('COMANDO INVALIDO\n');
    }


}).listen(serverPort, serverIP);


    
    
    
    
    
    
// ###############          UDP         ###################
var dgram = require("dgram");
var udpServer = dgram.createSocket("udp4");



udpServer.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    udpServer.close();
});

udpServer.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    
    var jsonData = JSON.parse(msg);
    
    ServerActions.proccessHostRegisterRequest(rinfo.address, jsonData);
});

udpServer.on("listening", function () {
    var address = udpServer.address();
    console.log("server listening " + address.address + ":" + address.port);
});

udpServer.bind(serverPort);
