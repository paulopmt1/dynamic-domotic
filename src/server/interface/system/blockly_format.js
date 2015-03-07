Blockly.Format = {
    getNodeByNameId: function(nodeObject, nodeNameId){
        var inputList = nodeObject.sourceBlock_.inputList;
        
        for (var input in inputList){
            var items = inputList[input].fieldRow;
            
            for (var item in items){
                if (items[item].name == nodeNameId) {
                    return items[item];
                }
                
                var a = 1;
            }
        }
        
        return false;
    },
    
    setFieldDropdownArray: function(fieldDropdown, array){
        fieldDropdown.menuGenerator_ = array;
    },
    
    /**
     * Muda os ítens de um dropdown vizinho do atual
     * @param {type} FieldDropdown  Dropdown de referência
     * @param {type} nodeId         Nome do dropdown destino
     * @param {type} newItems       Novos ítens a serem adicionados
     */
    changeFieldDropdownItems: function(FieldDropdown, nodeId, newItems){
        var desiredDropdown = this.getNodeByNameId(FieldDropdown, nodeId);
        
        this.setFieldDropdownArray(desiredDropdown, newItems);
    }
    
    
};