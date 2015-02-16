// Código https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#avvg6p
Blockly.Blocks['sensor_block'] = {
    init: function () {
        
        function getSystemBoards() {
            var options = [];
            
            options.push(["Placa x1", "x_1"]);
            options.push(["Placa x2", "x_2"]);
            
            return options;
        }
        
        function test(){
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
        }
        
        
        
        this.setColour(240);
        var input = this.appendDummyInput();
            input.appendField("Quando");
            
            // Adiciona dinamicamente as placas
            var dropdown = new Blockly.FieldDropdown(getSystemBoards(), function(board_id){
                console.log(board_id)
                this.sourceBlock_.updateShape_(divisorInput);
            });
            input.appendField(dropdown, 'board_id');
            
            
            // Adiciona sensores da primeira placa (selecionada por padrão)
            input.appendField(" .")
                .appendField(new Blockly.FieldDropdown([["Sensor 1", "SENSOR_1"], ["Sensor 2", "SENSOR_2"], ["Sensor 3", "SENSOR_3"]]), "sensor_id")
                .appendField(".")
                .appendField("Receber algo");

        

        this.appendStatementInput("DO_SOMETHING")
                .appendField("Faça");
        this.setTooltip('');
    }
};