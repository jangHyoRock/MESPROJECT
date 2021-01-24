sap.ui.define([
	"tips/mes/controller/BaseController",
	'sap/ui/core/mvc/Controller',
    'sap/ui/model/BindingMode',
    'sap/ui/model/json/JSONModel'
], function(BaseController, Controller, BindingMode, JSONModel) {
    "use strict";
        
    return BaseController.extend("tips.mes.controller.contents.Contents1",
    {
        onInit: function() {
            this.setModel(new JSONModel("/mes/model/betterSmall.json"), "product");
            this.byId("pm10_value").setText("320.4");//미세먼지(pm10농도)
        },
        
        onActive: function() {
//        	this.callAjax({url:"/mes/data",callback:"callbackFunction",error:"errorback"});
        },
        
        errorback: function(){ },
        
        callbackFunction : function(oModel)
        {
            var oData = oModel.getProperty("/result/list");
            
            this.byId("pm10_grade").setText(oData[0].pm10_grade);//미세먼지(pm10등급)
            this.byId("pm10_value").setText(oData[0].pm10_value);//미세먼지(pm10농도)
 
            this.byId("idTable").setModel(new JSONModel(oData));
        },
              
        errorCallbackFunction : function()
        {
            console.log("error callback");
        },
        
        localApi : function()
        {
            var oParam = {
                url     : "http://192.168.1.138:9001/list/page?page=1&size=25&sort=asc",
                type    : "GET",
                data    : "",
                callback: "callbackFunction",
                error   : "errorCallbackFunction"
            };
            
            this.callAjax(oParam);
        }
        
    });
}, true);
