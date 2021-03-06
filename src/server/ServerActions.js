/**
 * Processa todas as ações do servidor
 */

var assert = require('assert');
var http = require('http');
var formidable = require('formidable')

var CLIENT_REGISTER_TIMEOUT = 1000;
var clientPort = 8081;
Host = require('./db/Host');

module.exports = {
    /**
     * Recebe dados do cliente via UDP, e atualiza a base local com as informações do cliente
     * @param {type} remoteAddress  IP do cliente   
     * @param {type} hostObject     Dados do host (o que ele faz)
     */
    proccessHostRegisterRequest: function (remoteAddress, hostObject) {
        var hostId = hostObject.hostId;
        
        // Concatena IP do host
        hostObject.hostIP = remoteAddress;
        
        var that = this;

        if (!hostId) {
            throw new Error('Não foi recebido o hostId neste request. Abortado');
        }

        Host.findHostById(hostId, function (data) {
            if (!data) {
                console.log("vou armazenar os dados vindos de " + remoteAddress);
                Host.createNewHostRecord(hostObject, function (status) {
                    if (status) {
                        console.log('dados vindos do host ' + remoteAddress + ' cadastrados com sucesso');
                    }

                    that.sendClientConfirmMessage(remoteAddress);
                });
            } else {
                console.log('vou atualizar os dados deste host');

                Host.updateHostRecord(hostObject, function (status) {
                    console.log('IP do host ' + remoteAddress + ' atualizados com sucesso');

                    Host.findHostById(hostId, function (data) {
                        console.log('novos dados: ');
                        console.log(data);

                        that.sendClientConfirmMessage(remoteAddress, hostObject.hostPort);
                    });
                });
            }


        });
    },
    
    /**
     * Envia mensagem para cliente informando que ele está registrado
     * e por consequência permite ao cliente conhecer o IP do servidor
     * @param {type} clientIP
     * @returns {undefined}
     */
    sendClientConfirmMessage: function (clientIP, clientPort) {
        var options = {
            host: clientIP,
            path: '/registerOK',
            method: 'GET',
            port: clientPort
        };

        console.log('enviando confirmação para cliente: ' + clientIP);

        callback = function (response) {
            var str = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (chunk) {
                str += chunk;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                console.log('confirmação enviada, dados recebidos: ');
                console.log(str);
            });
        }

        // Envia a confirmação de registro 
        // (por hora para permitir o cliente chavear seu comportamento
        setTimeout(function(){
            var req = http.request(options, callback);
            req.on('error', function(error) {
                console.log('Falha ao contactar host: ' + error);
            });
            
            req.end();
        }, CLIENT_REGISTER_TIMEOUT);
    }
};