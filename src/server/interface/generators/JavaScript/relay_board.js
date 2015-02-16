Blockly.JavaScript['relay_board'] = function (block) {
    var argument1 = Blockly.JavaScript.valueToCode(block, 'VALUE',
            Blockly.JavaScript.ORDER_MEMBER) || '\'\'';

    var value = (argument1 == 'true') ? true : false;
    var code = 'setRelay("' + block.getFieldValue('board_id') + '","' + block.getFieldValue('NAME') + '","' + value + '");\n';

    return code;
};