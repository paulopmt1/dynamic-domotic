var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

var url = 'mongodb://localhost:27017/myproject';

module.exports = {
    findHostById: function(hostId, callback){
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('hosts');

            collection.findOne({"hostId": hostId}, function (err, doc) {
                assert.equal(err, null);
                callback(doc);
            });
        });
    },
    createNewHostRecord: function(hostData, callback){
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('hosts');

            collection.insert(hostData, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    },
    
    registerNewHost: function (remoteAddress, hostObject) {
        var hostId = hostObject.hostId;
        var that = this;

        if (!hostId) {
            throw new Error('Não foi recebido o hostId neste request. Abortado');
        }

        this.findHostById(hostId, function(data){
            if (!data){
                console.log("vou armazenar os dados vindos de " + remoteAddress);
                that.createNewHostRecord(hostObject, function(status){
                    if (status){
                        console.log('dados vindos do host ' + remoteAddress + ' cadastrados com sucesso');
                    }
                });
            }else{
                
                console.log('vou atualizar os dados deste host');
            }
        });

    }
};