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


Configuration = (function(obj){

    obj.clientSensorIp = "localhost";
    obj.clientSensorPort = "8080";//the port on which the server will communicate with
    obj.clientSensorBroadcast = "localhost"; // ip ended with .255
    obj.clientSensorType = "IN";
    obj.clientSensorHostId = "31AAC"; //must be unique

    obj.clientRelayIp = "localhost";
    obj.clientRelayPort = "8081"; //the port on which the server will communicate with
    obj.clientRelayBroadcast = "localhost"; // ip ended with .255
    obj.clientRelayType = "INOUT"; //IN -> input, OUT -> output, INOUT -> INPUT/OUTPUT
    obj.clientRelayHostId = "2A44F"; //must be unique


    obj.serverPort = "1010";


    return obj;

}(Configuration || {}));

