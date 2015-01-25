var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
var http = require('http');

var url = 'mongodb://localhost:27017/myproject';

module.exports = {
    findHostById: function (hostId, callback) {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('hosts');

            collection.findOne({"hostId": hostId}, function (err, doc) {
                assert.equal(err, null);
                callback(doc);
            });
        });
    },
    createNewHostRecord: function (hostData, callback) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('hosts');

            collection.insert(hostData, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    },
    updateHostRecord: function (hostData, callback) {
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('hosts');

            collection.update({hostId: hostData.hostId},
            {
                $set: {
                    hostIP: hostData.hostIP,
                    capabilities: hostData.capabilities
                }
            }, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    },
    proccessHostRegisterRequest: function (remoteAddress, hostObject) {
        var hostId = hostObject.hostId;
        // Concatena IP do host
        hostObject.hostIP = remoteAddress;
        var that = this;

        if (!hostId) {
            throw new Error('Não foi recebido o hostId neste request. Abortado');
        }

        this.findHostById(hostId, function (data) {
            if (!data) {
                console.log("vou armazenar os dados vindos de " + remoteAddress);
                that.createNewHostRecord(hostObject, function (status) {
                    if (status) {
                        console.log('dados vindos do host ' + remoteAddress + ' cadastrados com sucesso');
                    }

                    that.sendClientConfirmMessage(remoteAddress);
                });
            } else {
                console.log('vou atualizar os dados deste host');

                that.updateHostRecord(hostObject, function (status) {
                    console.log('IP do host ' + remoteAddress + ' atualizados com sucesso');

                    that.findHostById(hostId, function (data) {
                        console.log('novos dados: ');
                        console.log(data);

                        that.sendClientConfirmMessage(remoteAddress);
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
    sendClientConfirmMessage: function (clientIP) {
        var options = {
            host: clientIP,
            path: '/registerOK',
            method: 'GET',
            port: 8080
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

        // Envia após 3 segundos a confirmação de registro 
        // (por hora para permitir o cliente chavear seu comportamento
        setTimeout(function(){
            console.log('enviando agora');
            http.request(options, callback).end();
        }, 3000);
    }
};