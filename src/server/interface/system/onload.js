BlocklyStorage.backupOnUnload();

var server = 'http://localhost:1010/';
//var server = 'http://192.168.5.111:1010/';

setTimeout(function () {
    BlocklyStorage.restoreBlocks();





    $(".saveOnDb").click(function(){
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        
        $.post(server + 'saveWorkspace', {
            xml:            Blockly.Xml.domToText(xml),
            javascript:     Blockly.JavaScript.workspaceToCode()
        }, function(data){
            if (!data.status){
                alert('Falha ao salvar workpace');
            }else{
                alert('Salvo com sucesso!');
                BlocklyStorage.backupBlocks_();
            }
        });
    });

    $(".importFromDb").click(function(){
        $.get(server + 'importFromDb', function(data){
            if (data.status){
                Blockly.mainWorkspace.clear();
                BlocklyStorage.backupBlocksOnLocalStorage(data.xml);
                BlocklyStorage.restoreBlocks();
            }else{
                alert('Falha ao carregar workspace do banco');
            }
        });
    });
}, 100);



