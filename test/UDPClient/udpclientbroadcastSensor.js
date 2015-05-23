var dgram = require("dgram");
var assert = require('assert');
var http = require('http');
var formidable = require('formidable'),
    util = require('util');
var querystring = require('querystring');
require("../Configure/Configure.js");

var broadcastAddress = Configuration.clientSensorBroadcast;
var serverPort = Configuration.serverPort;
var serverIP = undefined;
var isRegistered = false;

var clientIP = Configuration.clientSensorIp;
var clientPort = Configuration.clientSensorPort;

// Cria um host com 5 relés e 3 sensores
var hostData = {
    hostPort: clientPort,
    hostId: Configuration.clientSensorHostId,
    type: Configuration.clientSensorType, // IN, OUT, INOUT
    capabilities: Configuration.clientSensorCapabilities
};

var message = new Buffer(JSON.stringify(hostData));

// Após enviar mensagem de broadcast, ouve por conexão do servidor para confirmação
sendBroadCastMessage(function(){
    // Aguarda confirmação do servidor
    listenForRegisterStatus();
});

function sendBroadCastMessage(callback) {
    var client = dgram.createSocket("udp4");
    client.bind();
    client.on("listening", function () {
        client.setBroadcast(true);
        client.send(message, 0, message.length, serverPort, broadcastAddress, function (err, bytes) {
            assert.equal(null, err);
            client.close();
            callback();
        });
    });
}

/**
 * ############# Rotina HTTP Listening do Cliente ###############
 * Ouve retorno do servidor confirmando registro,
 * e então salva o ip do servidor
 */
function listenForRegisterStatus() {
    http.createServer(function (req, res) {
        registerServerIP(req.connection.remoteAddress);
        
        switch (req.url){
            case '/registerOK':
                confirmRegister(req, res);
                break;
                
            default:
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('COMANDO INVÁLIDO\n');
        }
        
        
    }).listen(clientPort, clientIP);
}



function confirmRegister(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('OK\n');

    console.log('Confirmação recebida');
}


function registerServerIP(ip){
    console.log('IP do servidor: ' + ip)
    serverIP = ip;
    isRegistered = true;
}







// ################ Rotina de envio de dados dos sensores para servidor ############
setInterval(function(){
    if (isRegistered){
        var data = {
            board_id: hostData.hostId,
            client_id: hostData.hostId,
            sensor_id: 'SENSOR_2',
            sensor_type: 'DIGITAL',
            sensor_value: 1
        };
        
        var options = {
            host: serverIP,
            path: '/setSensorData',
            method: 'POST',
            port: serverPort,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(querystring.stringify(data))
            }
        };
        
        
        console.log('enviando dados do sensor para servidor: ' + serverIP);

        var post = http.request(options, false);
        post.write(querystring.stringify(data));
        
        post.end();
    }
},1000);
