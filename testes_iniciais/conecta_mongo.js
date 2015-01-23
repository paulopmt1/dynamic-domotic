var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");

    insertNewUser(db,function(){
        findDocuments(db, function(){
            db.close();
        });
        
    })

    
    /*
    
    insertDocuments(db, function(){
        console.log('inseri com sucesso');
        db.close();
    });
    */
});

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.dir(docs);
  });      
}

var hostData = {
    hostId: '2A44F',
    capabilities:{
        relay: 4
    }
};

var insertNewUser = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(hostData, function (err, result) {
        assert.equal(err, null);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}


var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}