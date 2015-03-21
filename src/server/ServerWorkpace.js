/**
 * Processa todas as ações do servidor
 */

var assert = require('assert');
var http = require('http');
var formidable = require('formidable');

var clientPort = 8080;
Workspace = require('./db/Workspace');


module.exports = {
    saveWorkspace: function(req, res){
        var form = new formidable.IncomingForm();

        form.parse(req, function(err, fields, files) {
            if (!fields['xml']){
                throw new Error('Dados de xml do workspace não recebidos');
            }
            
            var workspaceObject = {
                workspaceId:    '001',
                xml:            fields['xml'],
                javascript:     fields['javascript']
            };
            
            Workspace.findWorkpace(workspaceObject.workspaceId, function (data) {
                if (!data) {
                    Workspace.createNewWorkspace(workspaceObject, function (status) {
                        if (status) {
                            console.log('Dados do novo workspace cadastrados com sucesso');
                        }
                    });
                } else {
                    Workspace.updateWorkspace(workspaceObject, function (status) {
                        if (status) {
                            console.log('Dados do novo workspace atualizados com sucesso');
                        }
                    });
                }
            });
            
            
            
            res.writeHead(200, {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
                'Content-Type': 'application/json'
            });
            res.end(JSON.stringify({status: true}));
        });
    },
    
    importFromDb: function(req, res){
        var workspaceObject = {
            workspaceId: '001'
        };

        Workspace.findWorkpace(workspaceObject.workspaceId, function (data) {
            if (!data) {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({status: false}));
            } else {
                res.writeHead(200, {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods' : 'GET, PUT, POST, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Content-Range, Content-Disposition, Content-Description',
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify({status: true, xml: data.xml}));
            }
        });
    },
    
    
    getJavascriptCode: function(callback){
        var workspaceObject = {
            workspaceId: '001'
        };

        Workspace.findWorkpace(workspaceObject.workspaceId, function (data) {
            if (data) {
                callback(data.javascript);
            } else {
                callback(false);
            }
        });
    }
};