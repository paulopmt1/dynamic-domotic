Blockly.JavaScript['relay_board'] = function (block) {
    var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_MEMBER) || '\'\'';
            
    var code = 'setRelay("' + block.getFieldValue('board_id') + '","' + block.getFieldValue('NAME') + '","' + argument1 + '");\n';

    return code;
};