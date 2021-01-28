sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel'
], function(BaseController, Controller, BindingMode, JSONModel) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.Board",
    {
        onInit: function() {
        	window.board = this;
        },
        
        onActive: function() {
        	console.log("tips.mes.controller.contents.Board onActive()");
        },
        
        errorback: function(){ },
        
        callbackFunction : function(oModel) {
            var oData = oModel.getProperty("/result/list");
            this.byId("idTable").setModel(new JSONModel(oData));
        },
              
        errorCallbackFunction : function() {
            console.log("error callback");
        }
        
    });
}, true);