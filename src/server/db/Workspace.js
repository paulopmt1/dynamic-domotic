var assert = require('assert');

DB = require('./MongoDB');

module.exports = {
    findWorkpace: function (workspaceId, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
            assert.equal(null, err);

            var collection = db.collection('workspace');

            collection.findOne({"workspaceId": workspaceId}, function (err, doc) {
                assert.equal(err, null);
                callback(doc);
            });
        });
    },
    
    createNewWorkspace: function (workspaceObject, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
            var collection = db.collection('workspace');
            
            collection.insert(workspaceObject, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    },
    
    updateWorkspace: function (workspaceObject, callback) {
        DB.getClient().connect(DB.getUrl(), function (err, db) {
            var collection = db.collection('workspace');

            collection.update({workspaceId: workspaceObject.workspaceId},
            {
                $set: {
                    xml:        workspaceObject.xml,
                    javascript: workspaceObject.javascript
                }
            }, function (err, result) {
                assert.equal(err, null);
                callback(result);
            });
        });
    }
}