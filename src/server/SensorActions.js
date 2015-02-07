/**
 * Processa todas as ações do servidor
 */

var assert = require('assert');
var http = require('http');
var formidable = require('formidable')

var clientPort = 8080;
Sensor = require('./db/Sensor');

module.exports = {
    setSensorData: function(req, res){
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (validateSensor(fields)){
                console.log('Sensor ok, recebendo dados');
                
                Sensor.setSensorData();
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