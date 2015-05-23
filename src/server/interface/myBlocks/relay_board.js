// C�digo https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#j4gf7n
Blockly.Blocks['relay_board'] = {
    init: function () {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(20);
        this.appendDummyInput()
                .appendField("Defina")
                .appendField(new Blockly.FieldDropdown([["2A44F", "2A44F"], ["Placa Quarto", "18BC"]]), "board_id")
                .appendField(" .")
                .appendField(new Blockly.FieldDropdown([["Atuador 1", "RELAY_1"], ["Atuador 2", "RELAY_2"], ["Atuador 3", "RELAY_3"]]), "NAME")
                .appendField(". Para");
        this.appendValueInput("VALUE")
                .setCheck(["Boolean", "Number"]);
        this.setInputsInline(true);
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('');
    }
};