//Código https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kcyi28
/**
 * block for receiving data from sensors
 * @type {{init: Function}}
 */
Blockly.Blocks['sensor_board'] = {
    init: function() {
        this.setColour(200);
        var input = this.appendDummyInput();
        input.appendField("Leia valor da");
        input.appendField(Blockly.SystemBoards.getDropdownBoards(), 'board_id');

        // Adiciona sensores da primeira placa (selecionada por padrão)
        input.appendField(" . no sensor ")
                .appendField(new Blockly.FieldDropdown(Blockly.SystemBoards.getFirstBoardTuples()), "sensor_id");

        this.appendStatementInput("DO_SOMETHING")
                .appendField("E faça");
        this.setTooltip('');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};
