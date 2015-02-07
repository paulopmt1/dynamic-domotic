var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/myproject';

module.exports = {
    getClient: function(){
        return MongoClient;
    },
    getUrl: function(){
        return url;
    }
    
    
};