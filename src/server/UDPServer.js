var serverPort = 1010;

var dgram = require("dgram");
var server = dgram.createSocket("udp4");

ServerActions = require('./ServerActions');


server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});

server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    
    var jsonData = JSON.parse(msg);
    
    ServerActions.proccessHostRegisterRequest(rinfo.address, jsonData);
});

server.on("listening", function () {
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

server.bind(serverPort);