//Código https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kcyi28
/**
 * block for receiving data from sensors
 * @type {{init: Function}}
 */
Blockly.Blocks['sensor_board'] = {
    init: function() {
        this.setHelpUrl('http://www.example.com/');
        this.setColour(30);
        this.appendDummyInput()
                .appendField("Receba")
                .appendField(Blockly.SystemBoards.getDropdownBoars(), 'board_id')
                .appendField(" .")
                .appendField(new Blockly.FieldDropdown([["Sensor 1", "SENSOR_1"], ["Sensor 2", "SENSOR_2"], ["Sensor 3", "SENSOR_3"]]), "NAME");
        this.setInputsInline(true);
        this.setOutput(true);
        this.setTooltip('');
    }
};