Blockly.JavaScript['sensor_board'] = function (block) {

    var code = 'readSensor("' + block.getFieldValue('board_id') + '","' + block.getFieldValue('NAME')+')';
    
    return [code, Blockly.JavaScript.ORDER_ADDITION];

};