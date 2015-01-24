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
    updateHostRecord: function(hostData, callback){
        MongoClient.connect(url, function (err, db) {
            var collection = db.collection('hosts');

            collection.update({hostId: hostData.hostId},
            {
                $set : {
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
                
                that.updateHostRecord(hostObject, function(status){
                    console.log('IP do host ' + remoteAddress + ' atualizados com sucesso');
                    
                    that.findHostById(hostId, function(data){
                        console.log('novos dados: ');
                        console.log(data);
                    })
                });
            }
        });
    }
};