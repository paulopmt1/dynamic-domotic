<?php

header('Access-Control-Allow-Origin: *');  
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <script src="blockly_uncompressed.js"></script>
        <script src="blocks/logic.js"></script>
        <script src="blocks/loops.js"></script>
        <script src="blocks/math.js"></script>
        <script src="blocks/text.js"></script>
        <script src="blocks/lists.js"></script>
        <script src="blocks/colour.js"></script>
        <script src="blocks/variables.js"></script>
        <script src="blocks/procedures.js"></script>

        <script src="generators/javascript.js"></script>
        <script src="generators/javascript/logic.js"></script>
        <script src="generators/javascript/loops.js"></script>
        <script src="generators/javascript/math.js"></script>
        <script src="generators/javascript/text.js"></script>
        <script src="generators/javascript/lists.js"></script>
        <script src="generators/javascript/colour.js"></script>
        <script src="generators/javascript/variables.js"></script>
        <script src="generators/javascript/procedures.js"></script>

        <script src="myGenerators/JavaScript/relay_board.js"></script>
        <script src="myGenerators/JavaScript/sensor_block.js"></script>
        <script src="myGenerators/JavaScript/sensor_board.js"></script>

        <script src="myBlocks/sensor_block.js"></script>
        <script src="myBlocks/relay_board.js"></script>
        <script src="myBlocks/sensor_board.js"></script>

        <script src="system/jquery-2.0.js"></script>
        <script src="system/blockly_format.js"></script>
        <script src="system/system_boards.js"></script>
        <script src="system/storage.js"></script>
        <script src="system/onload.js"></script>
        <script src="pt-br.js"></script>
    </head>
    <body>
        <div id="control">
            <button class="saveOnDb">Salvar alterações no banco</button>
            <button class="importFromDb">Importar configuração do banco</button>
            
        </div>
        <div id="blocklyDiv" style="height: 580px; width: 1000px;"></div>
    <xml id="toolbox" style="display: none">
        <category name="Core">
            <category name="Logic">
                <block type="controls_if"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_negate"></block>
                <block type="logic_boolean"></block>
            </category>
            <category name="Variables">
                <block type="variables_get"></block>
                <block type="variables_set"></block>
            </category>
            <category name="Loops">
                <block type="controls_repeat_ext">
                    <value name="TIMES">
                        <block type="math_number">
                            <field name="NUM">10</field>
                        </block>
                    </value>
                </block>
                <block type="controls_whileUntil"></block>
            </category>
            <category name="Math">
                <block type="math_number"></block>
                <block type="math_arithmetic"></block>
                <block type="math_single"></block>
                <block type="math_number_property">
                    <b><mutation divisor_input="true"></mutation></b>
                    <field name="PROPERTY">DIVISIBLE_BY</field>
                </block>
            </category>
            <category name="Text">
                <block type="text"></block>
                <block type="text_length"></block>
                <block type="text_print"></block>
            </category>
        </category>
        <sep></sep>
        <category name="Casa">
            <category name="Atuadores">
                <block type="relay_board"></block>
            </category>
            <category name="Sensores">
                <block type="sensor_block">
                    <b><mutation divisor_input="true"></mutation></b>
                    <field name="sensor_id">DIVISIBLE_BY</field>
                </block>
                <block type="sensor_board"></block>
            </category>
        </category>
    </xml>

    <script>
        Blockly.inject(
                document.getElementById('blocklyDiv'), {
            toolbox: document.getElementById('toolbox')
        }
        );

    </script>
</body>
</html>
