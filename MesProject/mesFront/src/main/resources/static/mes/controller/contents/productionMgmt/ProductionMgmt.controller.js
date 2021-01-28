sap.ui.define([
	"tips/mes/controller/BaseController"
], function(BaseController) {
	"use strict";
		
	return BaseController.extend("tips.mes.controller.contents.productionMgmt.ProductionMgmt", {

		onInit : function () {
            window.ProductionMgmt = this; 
			console.log("ProductionMgmt.js OnInit()");
		}
	});
}, true);