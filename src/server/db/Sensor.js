var assert = require('assert');

DB = require('./MongoDB');

module.exports = {
    setSensorData: function (boardId, sensorId, callback) {
        console.log('setSensorData: Falta implementar');
        
        callback(true);
    },
    
    readSensor: function(boardId, sensorId, callback){
        console.log('readSensor: Falta implementar');
        
        callback(false);
    }
}