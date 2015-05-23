/**
 * Processa todas as ações do servidor
 */

var assert = require('assert');
var http = require('http');
var formidable = require('formidable')
var querystring = require('querystring');

Sensor = require('./db/Sensor');
ServerWorkpace = require('./ServerWorkpace');
Sensor = require('./db/Sensor');
PublishSubscribe = require('./PublishSubscribe');
Host = require('./db/Host');

module.exports = {
    setSensorData: function(req, res){
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            var boardId = fields.board_id,
                sensorId = fields.sensor_id;
            
            if (validateSensor(fields)){
                console.log('Sensor ok, recebendo dados');
                
                Sensor.setSensorData(boardId, sensorId, function(data){
                    if (data){
                        loadSystem(boardId, sensorId);
                    }
                });
            }
            
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            });
            res.end('OK\n');
        });
        
    }
};

/**
 * Verifica se o sensor é válido
 * @param {type} sensorData
 * @returns {undefined}
 */
function validateSensor(sensorData){
    var sensorPattern = ['client_id', 'sensor_id', 'sensor_type', 'sensor_value'];
    
    for (var item in sensorPattern){
        if (!sensorData[sensorPattern[item]]){
            console.log("Sensor possui parâmetros incorretos. Deve seguir o padrao:");
            console.log(sensorPattern);
            console.log("Dados do sensor:");
            console.log(sensorData);
            
            return false;
        }
    }
    
    return true;
}


/**
 * Carrega código javascript da interface do usuário e roda sistema
 */
function loadSystem(boardId, sensorId){
    // Carrega o sistema
    ServerWorkpace.getJavascriptCode(function(data){
        console.log('Executando código javascript: ');
        console.log(data);
        eval(data);

        // Gera evento do sensor no sistema
        var handler = 'handleBoard/' + boardId + '/' + sensorId;
        console.log('fazendo publish para ' + handler);
        PublishSubscribe.publish(handler);
    });
}


/**
 * Cadastra eventos da interface do cliente
 * @param {type} handler
 * @param {type} callback
 */
function subscribe(handler, callback){
    console.log('fazendo subscribe para ' + handler)
    PublishSubscribe.subscribe(handler, callback);
}

/**
 * Lê valores de um sensor do banco de dados
 * @param {type} boardId
 * @param {type} sensorId
 * @param {type} callback
 */
function readSensor(boardId, sensorId, callback){
    console.log("lendo sensor " + sensorId + " da placa " + boardId);
    
    Sensor.readSensor(boardId, sensorId, function(data){
        callback(data);
    });
}

/**
 * Define status de um relé no sistema em uma placa remota
 * @param {type} hostId
 * @param {type} relayId
 * @param {type} relayStatus
 */
function setRelay(hostId, relayId, relayStatus){
    console.log("Obtendo placa " + hostId);
    
    Host.findHostById(hostId, function (data) {
        sendPostRelayToClient(data.hostIP, data.hostPort, relayId, relayStatus);
    });
}


/**
 * Envia informações para a placa cliente com comando setRelayStatus
 * @param {type} clientIP
 * @param {type} clientPort
 * @param {type} relayId
 * @param {type} relayStatus
 * @returns {undefined}
 */
function sendPostRelayToClient(clientIP, clientPort, relayId, relayStatus){
    var data = {
        relayId: relayId,
        relayStatus: relayStatus
    };
    
    var options = {
        host: clientIP,
        path: '/setRelayStatus',
        method: 'POST',
        port: clientPort,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(querystring.stringify(data))
        }
    };

    console.log('executando /setRelayStatus no o cliente ' + clientIP + ' na porta ' + clientPort + ' com os dados:');
    console.log(data);

    var post = http.request(options, false);
    post.write(querystring.stringify(data));
    post.on('error', function(error) {
        console.log('Falha ao se comunicar com cliente ' + clientIP + ': ' + error);
    });
    
    post.end();
}