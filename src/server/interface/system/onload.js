BlocklyStorage.backupOnUnload();

var server = 'http://192.168.5.109:1010/';

setTimeout(function () {
    BlocklyStorage.restoreBlocks();





    $(".saveOnDb").click(function(){
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        
        $.post(server + 'saveWorkspace', {
            xml: Blockly.Xml.domToText(xml)
        }, function(data){
            if (!data.status){
                alert('Falha ao salvar workpace');
            }else{
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



