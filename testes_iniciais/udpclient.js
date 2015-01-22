var dgram = require('dgram');
var message = new Buffer("algo enviado");
var client = dgram.createSocket("udp4");
//client.setBroadcast(true);
client.send(message, 0, message.length, 41234, "192.168.5.255", function(err, bytes) {
  client.close();
});
