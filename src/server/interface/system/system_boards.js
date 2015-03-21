Blockly.SystemBoards = {
    
    getSystemBoards: function() {
        var options = [];

        options.push(["Placa 2A44F", "2A44F"]);
        options.push(["Placa 31AAC", "31AAC"]);

        return options;
    },
    
    getFirstBoardTuples: function(){
        return [["1", "SENSOR_1"], ["2", "SENSOR_2"], ["3", "SENSOR_3"]];
    },
    
    getBoardTuples: function(boardId){
        if (boardId == "2A44F"){
            return [["1", "SENSOR_1"], ["2", "SENSOR_2"], ["3", "SENSOR_3"]];
        }
        if (boardId == "31AAC"){
            return [["1", "SENSOR_1"], ["2", "SENSOR_2"]];
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