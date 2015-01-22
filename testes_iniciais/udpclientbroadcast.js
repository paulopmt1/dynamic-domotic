var dgram = require("dgram");
var broadcastAddress = "192.168.5.255";

var message = new Buffer("Mensagem enviada para broadcast");

var client = dgram.createSocket("udp4");
client.bind();
client.on("listening", function () {
    client.setBroadcast(true);
    client.send(message, 0, message.length, 41234, broadcastAddress, function(err, bytes) {
        client.close();
    });
});
