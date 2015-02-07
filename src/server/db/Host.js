var assert = require('assert');

DB = require('./MongoDB'); 

module.exports = {
    findHostById: function (hostId, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('hosts');

            collection.findOne({"hostId": hostId}, function (err, doc) {
                assert.equal(err, null);
                callback(doc);
            });
        });
    },
    createNewHostRecord: function (hostData, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
            var collection = db.collection('hosts');

            collection.insert(hostData, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    },
    updateHostRecord: function (hostData, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
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
    }
}