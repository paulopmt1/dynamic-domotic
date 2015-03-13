Blockly.JavaScript['sensor_board'] = function (block) {

    var internalCode = Blockly.JavaScript.statementToCode(block, 'DO_SOMETHING');
    
    var code = "readSensor('" + block.getFieldValue('board_id') + "','" + block.getFieldValue('sensor_id') + "'" + ", function(value){\n"
        + internalCode + '})\n';

    return code;
    //return [code, Blockly.JavaScript.ORDER_ADDITION];
};