// Create a namespace.
var BlocklyStorage = {};

/**
 * Backup code blocks to localStorage.
 * @private
 */
BlocklyStorage.backupBlocks_ = function () {
    if ('localStorage' in window) {
        var xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace());
        BlocklyStorage.backupBlocksOnLocalStorage(Blockly.Xml.domToText(xml));
    }
};

BlocklyStorage.backupBlocksOnLocalStorage = function(xmlText){
    // Gets the current URL, not including the hash.
    var url = window.location.href.split('#')[0];
    window.localStorage.setItem(url, xmlText);
}

/**
 * Bind the localStorage backup function to the unload event.
 */
BlocklyStorage.backupOnUnload = function () {
    window.addEventListener('unload', BlocklyStorage.backupBlocks_, false);
};

/**
 * Restore code blocks from localStorage.
 */
BlocklyStorage.restoreBlocks = function () {
    var url = window.location.href.split('#')[0];
    if ('localStorage' in window && window.localStorage[url]) {
        var xml = Blockly.Xml.textToDom(window.localStorage[url]);
        Blockly.Xml.domToWorkspace(Blockly.getMainWorkspace(), xml);
    }
};