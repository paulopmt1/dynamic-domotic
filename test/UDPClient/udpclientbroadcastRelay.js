var dgram = require("dgram");
var assert = require('assert');
var http = require('http');
var formidable = require('formidable'),
    util = require('util');
var querystring = require('querystring');
var Configuration = require("../Configuration/Configuration.js");

var broadcastAddress = Configuration.clientRelayBroadcast;
var serverPort = Configuration.serverPort;
var serverIP = undefined;
var isRegistered = false;

var clientIP = Configuration.clientRelayIp;
var clientPort = Configuration.clientRelayPort;

// Cria um host com 5 relés e 3 sensores
var hostData = {
    hostId: Configuration.clientRelayHostId,
    type: Configuration.clientRelayType, // IN, OUT, INOUT
    hostPort:clientPort,
    capabilities: {
        relay: 5,
        sensor: 3
    }
};

var message = new Buffer(JSON.stringify(hostData));

// Após enviar mensagem de broadcast, ouve por conexão do servidor para confirmação
sendBroadCastMessage(
    // Aguarda confirmação do servidor
);

function sendBroadCastMessage(callback) {

    var interval = setInterval(function () {

        console.log("Trying to locate server");

        var client = dgram.createSocket("udp4");
        client.bind();
        client.on("listening", function () {
            client.setBroadcast(true);
            client.send(message, 0, message.length, serverPort, broadcastAddress, function (err, bytes) {

                assert.equal(null, err);
                if(callback){
                    callback();
                }
                client.close();
            });
        });


    },5000);

    listenForRegisterStatus(interval);

}

/**
 * ############# Rotina HTTP Listening do Cliente ###############
 * Ouve retorno do servidor confirmando registro,
 * e então salva o ip do servidor
 */
function listenForRegisterStatus(interval) {
    http.createServer(function (req, res) {
        registerServerIP(req.connection.remoteAddress);
        
        switch (req.url){
            case '/registerOK':
                clearInterval(interval);
                confirmRegister(req, res);
                break;
            case '/setRelayStatus':
                clearInterval(interval);
                setRelayStatus(req, res);
                break;
                
            default:
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('COMANDO INVÁLIDO\n');
        }
        
        
    }).listen(clientPort, clientIP);
}


function setRelayStatus(req, res){
    if (req.method.toLowerCase() != 'post'){
        console.log('Tipo de request recebido inválido: ' + req.method);
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('METODO INVÁLIDO\n');
        return;
    }
    
    // Recebe dados do formulário
    // https://github.com/felixge/node-formidable
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      console.log("Vou acionar o rele " + fields.relayId + " com status " + fields.relayStatus);
      //res.end(util.inspect({fields: fields, files: files}));
      res.end("OK");
    });
}


function confirmRegister(req, res){
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('OK\n');

    console.log('Confirmação recebida');
}


function registerServerIP(ip){
    console.log('IP do servidor: ' + ip);
    serverIP = ip;
    isRegistered = true;
}