sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel'
], function(BaseController, Controller, BindingMode, JSONModel) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.BasicSetting",
    {  onInit: function() {
        	console.log("tips.mes.controller.contents.Main onInit()");
        },
        
        onActive: function() {
        	console.log("tips.mes.controller.contents.Main onActive()");
        }
        
    });
}, true);
