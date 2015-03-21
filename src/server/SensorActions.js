/**
 * Processa todas as ações do servidor
 */

var assert = require('assert');
var http = require('http');
var formidable = require('formidable')

var clientPort = 8080;
Sensor = require('./db/Sensor');
ServerWorkpace = require('./ServerWorkpace');
Sensor = require('./db/Sensor');
PublishSubscribe = require('./PublishSubscribe');

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
 * Define status de um relé no sistema
 * @param {type} boardId
 * @param {type} relayId
 * @param {type} relayStatus
 */
function setRelay(boardId, relayId, relayStatus){
    console.log("Obtendo placa " + boardId);
    console.log("Vou definir o status do rele " + relayId + " para " + relayStatus);
}
