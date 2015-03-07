Blockly.SystemBoards = {
    
    getSystemBoards: function() {
        var options = [];

        options.push(["Placa x1", "x_1"]);
        options.push(["Placa x2", "x_2"]);

        return options;
    },
    
    
    getDropdownBoars: function(){
        // Adiciona dinamicamente as placas
        return new Blockly.FieldDropdown(this.getSystemBoards(), function (board_id) {
            var newItems1 = [["a", "SENSOR_1"], ["b", "SENSOR_2"], ["c", "SENSOR_3"]]
            var newItems2 = [["001", "SENSOR_1"], ["002", "SENSOR_2"], ["003", "SENSOR_3"]]
            var newItems;
            
            if (board_id == "x_1"){
                newItems = newItems1;
            }else{
                newItems = newItems2;                
            }
            
            Blockly.Format.changeFieldDropdownItems(this, "sensor_id", newItems);
        });
    }
    
    
};