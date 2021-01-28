sap.ui.define([
	"tips/mes/controller/BaseController"
], function(BaseController) {
	"use strict";
		
	return BaseController.extend("tips.mes.controller.contents.productionMgmt.FacilityMgmt", {

		onInit : function () {
            window.facilityMgmt = this; 
			console.log("FacilityMgmt.js OnInit()");
		}
	});
}, true);