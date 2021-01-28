sap.ui.define([
	"tips/mes/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, Filter, FilterOperator) {
	"use strict";
		
	return BaseController.extend("tips.mes.controller.contents.employeeMgmt.EmployeeMgmt", {

		onInit : function () {
            window.performanceMgmt = this; 
			console.log("EmployeeMgmt.js OnInit()");

			// set explored app's demo model on this sample
//			var oModel = new JSONModel(sap.ui.require.toUrl("sap/ui/demo/mock/contents7.json"));
//			this.getView().setModel(oModel);
		},
//        onFilterInvoices : function (oEvent) {
//
//            // build filter array
//            var aFilter = [];
//            var sQuery = oEvent.getParameter("query");
//            if(sQuery) {
//                aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
//            }
//
//            // filter binding
//            var oList = this.byId("performance_management");
//            var oBinding = oList.getBinding("items");
//            oBinding.filter(aFilter);
//		},
		onOpenSetting : function () {
				this.getOwnerComponent().openSettingDialog();
		}
	});
}, true);