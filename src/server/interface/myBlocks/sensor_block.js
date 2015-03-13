// Código https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#avvg6p
Blockly.Blocks['sensor_block'] = {
    /*mutationToDom: function () {
        var container = document.createElement('mutation');
        var divisorInput = (this.getFieldValue('sensor_id') == 'DIVISIBLE_BY');
        container.setAttribute('divisor_input', divisorInput);
        return container;
    },
    domToMutation: function (xmlElement) {
        var hasDivisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
        this.updateShape_(hasDivisorInput);  // Helper function for adding/removing 2nd input.
    },
    /**
     * Modify this block to have (or not have) an input for 'is divisible by'.
     * @param {boolean} divisorInput True if this block has a divisor input.
     * @private
     * @this Blockly.Block
     *
    updateShape_: function (divisorInput) {
        return;
        this.removeInput('DIVISOR');
        
        var input = this.appendDummyInput();
        input.appendField("aaaaaa");
        
        // Add or remove a Value Input.
        var inputExists = this.getInput('DIVISOR');
        if (divisorInput) {
            if (!inputExists) {
                this.appendValueInput('DIVISOR')
                        .setCheck('Number');
            }
        } else if (inputExists) {
            this.removeInput('DIVISOR');
        }
    
    },*/
    init: function () {
        this.setColour(240);
        var input = this.appendDummyInput();
        input.appendField("Quando");
        input.appendField(Blockly.SystemBoards.getDropdownBoards(), 'board_id');

        // Adiciona sensores da primeira placa (selecionada por padrão)
        input.appendField(" . no sensor")
                .appendField(new Blockly.FieldDropdown(Blockly.SystemBoards.getFirstBoardTuples()), "sensor_id")
                .appendField(".")
                .appendField("Receber algo");

        this.appendStatementInput("DO_SOMETHING")
                .appendField("Faça");
        this.setTooltip('');
    }
};