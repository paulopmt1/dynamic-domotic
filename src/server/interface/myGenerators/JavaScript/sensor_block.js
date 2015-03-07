Blockly.JavaScript['sensor_block'] = function (block) {
    var boardId = block.getFieldValue('board_id');
    var sensorId = block.getFieldValue('sensor_id');
    
    var internalCode = Blockly.JavaScript.statementToCode(block, 'DO_SOMETHING');
    
    var code = "$.subscribe('handleBoard/" + boardId + "/" + sensorId + "', function(){\n"
        + internalCode + "\})";
    
    //var code = 'callX = function(boardId, sensorId){\n' + test + '}\("' + boardId + '", "' + sensorId + '");\n';

    return code;
};