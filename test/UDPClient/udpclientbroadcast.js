var dgram = require("dgram");
var broadcastAddress = "192.168.5.255";
var serverPort = 1010;

// Cria um host com 4 relés
var hostData = {
    hostId: '2A44F',
    capabilities:{
        relay: 4
    }
};

var message = new Buffer(JSON.stringify(hostData));

var client = dgram.createSocket("udp4");
client.bind();
client.on("listening", function () {
    client.setBroadcast(true);
    client.send(message, 0, message.length, serverPort, broadcastAddress, function(err, bytes) {
        client.close();
    });
});
