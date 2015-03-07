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
     * Muda os �tens de um dropdown vizinho do atual
     * @param {type} FieldDropdown  Dropdown de refer�ncia
     * @param {type} nodeId         Nome do dropdown destino
     * @param {type} newItems       Novos �tens a serem adicionados
     */
    changeFieldDropdownItems: function(FieldDropdown, nodeId, newItems){
        var desiredDropdown = this.getNodeByNameId(FieldDropdown, nodeId);
        
        this.setFieldDropdownArray(desiredDropdown, newItems);
    }
    
    
};