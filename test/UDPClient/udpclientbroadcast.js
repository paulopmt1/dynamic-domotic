var dgram = require("dgram");
var assert = require('assert');
var http = require('http');
var broadcastAddress = "192.168.1.255";
var clientIP = "192.168.1.3";
var serverPort = 1010;
var serverIP = undefined;

// Cria um host com 4 relés
var hostData = {
    hostId: '2A44F',
    type: 'IN', // IN, OUT, INOUT
    capabilities: {
        relay: 5
    }
};

var message = new Buffer(JSON.stringify(hostData));

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
 * Ouve retorno do servidor confirmando registro,
 * e então salva o ip do servidor
 */
function listenForRegisterStatus() {
    http.createServer(function (req, res) {
        registerServerIP(req.connection.remoteAddress);
        
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('OK\n');
        
        console.log('Confirmação recebida');
    }).listen(8080, clientIP);
}



function registerServerIP(serverIP){
    console.log('IP do servidor: ' + serverIP)
    this.serverIP = serverIP;
}


// Após enviar mensagem de broadcast, ouve por conexão do servidor para confirmação
sendBroadCastMessage(function(){
    // Aguarda confirmação do servidor
    listenForRegisterStatus();
});