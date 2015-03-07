Blockly.SystemBoards = {
    
    getSystemBoards: function() {
        var options = [];

        options.push(["Placa x1", "x_1"]);
        options.push(["Placa x2", "x_2"]);

        return options;
    },
    
    getFirstBoardTuples: function(){
        return [["a", "SENSOR_1"], ["b", "SENSOR_2"], ["c", "SENSOR_3"]];
    },
    
    getBoardTuples: function(boardId){
        if (boardId == "x_1"){
            return [["a", "SENSOR_1"], ["b", "SENSOR_2"], ["c", "SENSOR_3"]];
        }
        if (boardId == "x_2"){
            return [["1", "SENSOR_1"], ["2", "SENSOR_2"], ["3", "SENSOR_3"]];
        }
    },
    
    getDropdownBoards: function(){
        var that = this;
        
        // Adiciona dinamicamente as placas
        return new Blockly.FieldDropdown(this.getSystemBoards(), function (board_id) {
            var tuples = that.getBoardTuples(board_id);
            
            Blockly.Format.changeFieldDropdownItems(this, "sensor_id", tuples);
            
        });
    }
    
    
};