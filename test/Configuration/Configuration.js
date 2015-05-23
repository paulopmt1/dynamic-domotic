/**
 * Created by leonardoalbuquerque on 23/05/15.
 */

/**
 * if you change this do not commit
 *
 * this file contains all the basic configuration
 * like ports, ips and paths
 *
 * the configuration here is preconfigured to run
 * locally with all the original ports of mongodb and all
 *
 * again do not commit changes
 *
 */


module.exports = {

    Configuration: {

        clientSensorIp: "localhost",
        clientSensorPort: "8080",//the port on which the server will communicate with
        clientSensorBroadcast: "localhost", // ip ended with .255
        clientSensorType: "IN",
        clientSensorHostId: "31AAC", //must be unique

        clientRelayIp: "localhost",
        clientRelayPort: "8081", //the port on which the server will communicate with
        clientRelayBroadcast: "localhost", // ip ended with .255
        clientRelayType: "INOUT", //IN -> input, OUT -> output, INOUT -> INPUT/OUTPUT
        clientRelayHostId: "2A44F", //must be unique


        serverPort: "1010"

    }
};

