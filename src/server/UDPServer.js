var serverPort = 1010;

var dgram = require("dgram");
var server = dgram.createSocket("udp4");

HostActions = require('./HostActions');


server.on("error", function (err) {
    console.log("server error:\n" + err.stack);
    server.close();
});

server.on("message", function (msg, rinfo) {
    console.log("server got: " + msg + " from " + rinfo.address + ":" + rinfo.port);
    
    var jsonData = JSON.parse(msg);
    
    HostActions.registerNewHost(rinfo.address, jsonData);
});

server.on("listening", function () {
    var address = server.address();
    console.log("server listening " + address.address + ":" + address.port);
});

server.bind(serverPort);