var dgram = require("dgram");
var assert = require('assert');
var http = require('http');
var formidable = require('formidable'),
    util = require('util');
var querystring = require('querystring');


var broadcastAddress = "192.168.5.255";
var clientIP = "192.168.5.109";
var serverPort = 1010;
var serverIP = undefined;
var isRegistered = false;

// Cria um host com 5 relés e 3 sensores
var hostData = {
    hostId: '2A44F',
    type: 'INOUT', // IN, OUT, INOUT
    capabilities: {
        relay: 5,
        sensor: 3
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
        
        switch (req.url){
            case '/registerOK':
                confirmRegister(req, res);
                break;
            case '/setRelayStatus':
                setRelayStatus(req, res);
                break;
                
            default:
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.end('COMANDO INVÁLIDO\n');
        }
        
        
    }).listen(8080, clientIP);
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
      console.log("Vou acionar o rele " + fields.relay + " com status " + fields.status)
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
    console.log('IP do servidor: ' + ip)
    serverIP = ip;
    isRegistered = true;
}

// Após enviar mensagem de broadcast, ouve por conexão do servidor para confirmação
sendBroadCastMessage(function(){
    // Aguarda confirmação do servidor
    listenForRegisterStatus();
});






setInterval(function(){
    if (isRegistered){
        var data = {
            board_id: hostData.hostId,
            client_id: hostData.hostId,
            sensor_id: 'SENSOR_3',
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
