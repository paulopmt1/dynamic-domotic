var serverPort = 1010;
var serverIP = "localhost";
//var serverIP = "192.168.5.109";
var http = require('http');

var formidable = require('formidable'),
    util = require('util');
    
ServerActions = require('./ServerActions');
SensorActions = require('./SensorActions');
ServerWorkpace = require('./ServerWorkpace');


// ###############          TCP         ###################
http.createServer(function (req, res) {
    switch (req.url){
        case '/setSensorData':
            SensorActions.setSensorData(req, res);
            break;

        case '/saveWorkspace':
            ServerWorkpace.saveWorkspace(req, res);
            break;

        case '/importFromDb':
            ServerWorkpace.importFromDb(req, res);
            break;

        default:
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('COMANDO INVÁLIDO\n');
            console.log('Comando recebido não registrado: ' + req.url);
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
