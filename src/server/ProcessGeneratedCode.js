
var vm = require('vm');
ServerWorkpace = require('./ServerWorkpace');


var events = (function(){
  var topics = {};
  var hOP = topics.hasOwnProperty;

  return {
    subscribe: function(topic, listener) {
      // Create the topic's object if not yet created
      if(!hOP.call(topics, topic)) topics[topic] = [];

      // Add the listener to queue
      var index = topics[topic].push(listener) -1;

      // Provide handle back for removal of topic
      return {
        remove: function() {
          delete topics[topic][index];
        }
      };
    },
    publish: function(topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if(!hOP.call(topics, topic)) return;

      // Cycle through topics queue, fire!
      topics[topic].forEach(function(item) {
            item(info != undefined ? info : {} );
      });
    }
  };
})();


function subscribe(handler, callback){
    console.log('fazendo subscribe para ' + handler)
    events.subscribe(handler, callback);
}

var assert = require('assert');
DB = require('./db/MongoDB'); 

function readSensor(boardId, sensorId, callback){
    console.log("lendo sensor " + sensorId + " da placa " + boardId);
    
    DB.getClient().connect(DB.getUrl(), function (err, db) {
        callback(true);
        
        /*
        assert.equal(null, err);

        var collection = db.collection('hosts');
        collection.findOne({"hostId": hostId}, function (err, doc) {
            assert.equal(err, null);
            callback(doc);
        });*/
    });
}

function setRelay(boardId, relayId, relayStatus){
    console.log("Obtendo placa " + boardId);
    console.log("Vou definir o status do rele " + relayId + " para " + relayStatus);
}


ServerWorkpace.getJavascriptCode(function(data){
    console.log(data);
    
    var vmResult = eval(data);

    // Gera evento para teste
    //events.publish('handleBoard/x_1/SENSOR_2');
});
/*
var code = "var value;\
subscribe('handleBoard/x_1/SENSOR_2', function(){\
  readSensor('x_1','SENSOR_2', function(value){\
    if (value == true) {\
      setRelay('23AD','RELAY_1',false);\
    }\
    setRelay('23AD','RELAY_1',(!value));\
  })\
})";
*/


